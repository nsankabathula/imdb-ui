export enum MessageType {
    text = 'TEXT',
    json = 'JSON'
}

export interface IMessage {
    type: string;
    body: Array<IResponse> | string | any;
    location?: string;
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

export const DEFAULT_MESSAGE: IMessage = <IMessage>{
    type: MessageType.text, body: 'Good Morning', location: undefined
};


export interface IMessageExtension extends IMessage {
    type: string;
    body: Array<IResponse> | string | Array<Array<IResponse>>;
}

export interface IImageProperties {
    height: number;
    width: number;
    url: string;
}
