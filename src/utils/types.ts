enum ASSET_STATUS {
    Running = "RUNNING",
    Alerting = "ALERTING",
    Stopped = "STOPPED", 
}

export interface IAsset {
    _id: string,
    image: string,
    description: string,
    owner: string,
    status: ASSET_STATUS,
    health: number,
}

export interface IUnit {
    _id: string,
    name: string,
    assets: IAsset[],
}

export interface ICompany {
    _id: string,
    name: string,
    units: IUnit[],
    users: IUser[]
}

export interface IUser {
    _id: string,
    company_id: string,
    name: string,
    password: string,
}

export type NewRegistry<T> = Omit<T, "_id">;