import { GeneDataOption } from "@/types/gene";

export const getAllGenes = async (searchParam: string = "") => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gene/${searchParam}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export const getAllGenesResults = async (selectedGenes: GeneDataOption[]) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gene`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*'
      },
      body: JSON.stringify({
        page: 1,
        limit: 50,
        genes: selectedGenes.map(gene => gene.gene)
      })
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export const getGeneStats = async (gene: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gene/gene-stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*'
      },
      body: JSON.stringify({
        gene: gene
      })
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
