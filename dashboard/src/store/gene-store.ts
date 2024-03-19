import { GeneDataList, GeneDataResult, GeneStats } from '@/types/gene';
import { atom } from 'jotai';

export const counterAtom = atom<number>(0);

export const geneSelectListOptionsAtom = atom<GeneDataList>([]);

export const geneSelectedOptionsAtom = atom<GeneDataList>([]);

export const geneSearchParamAtom = atom<string>("");

export const geneAnalyticsTableResultAtom = atom<GeneDataList>([]);
export const geneAnalyticsTableResultsIsLoadingAtom = atom<boolean>(false);

export const geneAnalyzeSelectionAtom = atom<GeneDataResult | null>(null);
export const geneStatsAtom = atom<GeneStats | null>(null);

