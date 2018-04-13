export enum MessageType {
    text = 'TEXT',
    json = 'JSON'
}

export interface IMessage {
    type: string;
    body: Array<IResponse> | string | any;
}

export interface IResponse {
    tconst: string;
    titleType: string;
    primaryTitle: string;
    runtimeMinutes: number;
    genres: Array<string>;
    averageRating: number;
    numVotes: number;
    poster: string;
}


export interface IMessageExtension extends IMessage {
    type: string;
    body: Array<IResponse> | string | Array<Array<IResponse>>;
}

export interface IImageProperties {
    height: number;
    width: number;
    url: string;
}
