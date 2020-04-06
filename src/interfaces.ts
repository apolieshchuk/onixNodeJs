export interface ConnectOptions {
    autoReconnect: boolean;
    reconnectTries: number;
    reconnectInterval: number;
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
}

export interface ChartInterface {
    code3: string;
    value: number;
}
