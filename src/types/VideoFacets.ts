export interface VideoFacets {
  subjects: {
    [id: string]: Facet;
  };
  ageRanges: {
    [id: string]: Facet;
  };
}

export interface Facet {
  hits: number;
}
