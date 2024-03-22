# The help target prints out all targets with their descriptions organized
# beneath their categories. The categories are represented by '##@' and the
# target descriptions by '##'. The awk commands is responsible for reading the
# entire set of makefiles included in this invocation, looking for lines of the
# file as xyz: ## something, and then pretty-format the target and help. Then,
# if there's a line with ##@ something, that gets pretty-printed as a category.
# More info on the usage of ANSI control characters for terminal formatting:
# https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_parameters
# More info on the awk command:
# http://linuxcommand.org/lc3_adv_awk.php

API_ROOT := ./api
DASHBOARD_ROOT := ./dashboard
MONGO_DB_SEEDER_ROOT := ./data/mongodb-data-seeder
help: ## Display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_0-9-]+:.*?##/ { printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

.PHONY: build test

copyEnv: ## Perform the initial project setup.
	cp ${API_ROOT}/.env.example ${API_ROOT}/.env
	cp ${DASHBOARD_ROOT}/.env.example ${DASHBOARD_ROOT}/.env
	cp ${MONGO_DB_SEEDER_ROOT}/.env.local.example ${MONGO_DB_SEEDER_ROOT}/.env
	make fresh-start

setup:
	make copyEnv && make fresh-start & make seed

retry:
	make services-down && make services-up & make seed


seed:
	chmod +x ${MONGO_DB_SEEDER_ROOT}/wait-for-mongodb.sh
	${MONGO_DB_SEEDER_ROOT}/wait-for-mongodb.sh

build: ## Build app images
	docker compose build --no-cache

build-test: ## Build test images
	docker-compose build --no-cache test

init-db: pull-latest services-ready ## Init DB with `pull-latest` and `services-ready`
	docker-compose run --rm test npm run reset-db

test: services-ready ## Run test with `services-ready`
	docker-compose run test npm run cover


services-up: ## Start dependent services
	docker compose up

services-down: ## Stop dependent services
	docker-compose down

services-wait: ## Wait for dependent services to be ready
	docker-compose exec postgres sh -c "until PGCONNECT_TIMEOUT=1 psql -U postgres -h 127.0.0.1 -c \"select version();\"; do sleep 1; done" >/dev/null
	docker-compose exec postgres2 sh -c "until PGCONNECT_TIMEOUT=1 psql -U postgres -h 127.0.0.1 -c \"select version();\"; do sleep 1; done" >/dev/null
	docker-compose exec pgbouncer sh -c "until nc -w 1 -z localhost 5432 ; do sleep 1; done" >/dev/null
	docker-compose exec rabbitmq sh -c "until nc -w 1 -z localhost 5672 ; do sleep 1; done" >/dev/null

services-ready: services-up services-wait ## Start and wait for dependent services

run-data-seeder: ## Build and run the data seeding Docker container once, then remove it after completion.
	@echo "installing packages..."
	cd $(MONGO_DB_SEEDER_ROOT) && npm i 
	@echo "seeding database..."
	cd $(MONGO_DB_SEEDER_ROOT) && node index.js

fresh-start: ## Stop all services, remove all containers, networks, and volumes, then start all services.
	make services-down && make build && make services-up

local-test: local-init-db ## Run tests locally after `local-init-db`
	npm run test

stop: ## Stop dependent services
	docker-compose down -v --remove-orphans

clean: stop ## Alias for stop