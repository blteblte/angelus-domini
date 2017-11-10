
export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}

export interface Default {
    url: string;
}

export interface Medium {
    url: string;
}

export interface High {
    url: string;
}

export interface Thumbnails {
    default: Default;
    medium: Medium;
    high: High;
}

export interface Localized {
    title: string;
    description: string;
}

export interface Snippet {
    title: string;
    description: string;
    publishedAt: Date;
    thumbnails: Thumbnails;
    localized: Localized;
}

export interface RelatedPlaylists {
    uploads: string;
    watchHistory: string;
    watchLater: string;
}

export interface ContentDetails {
    relatedPlaylists: RelatedPlaylists;
}

export interface Statistics {
    viewCount: string;
    commentCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
}

export interface Item {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
    contentDetails: ContentDetails;
    statistics: Statistics;
}

export interface GapiChannelsResponse {
    kind: string;
    etag: string;
    pageInfo: PageInfo;
    items: Item[];
}
