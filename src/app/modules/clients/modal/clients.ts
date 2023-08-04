export interface Clients {
    message:     string;
    data:        DataClients[];
    isSucsseded: boolean;
    status:      number;
}

export interface DataClients {
    clientId:         number;
    clientName:       string;
    clientNo:         number;
    email:            string;
    fax:              string;
    mobile:           string;
    tel1:             string;
    clientAddress:    string;
    createdBy:        number;
    creationDate:     Date;
    modifiedBy:       number;
    modificationDate: Date;
}