export interface Pay {
    secureHash: string;
    apiClientID: string;
    serviceID: number;
    notificationURL: string;
    pictureURL: string;
    callBackURLOnSuccess: string;
    billRefNumber: string;
    currency: string;
    amountExpected: number;
    billDesc: string;
    clientMSISDN: string;
    clientIDNumber: string;
    clientEmail: string;
    clientName: string;
}
