export interface Listing {
    listingType:String,
    business:String,
    tradingName:String,
    email:String,
    phone:String,
    website:String,
    address:String,
    category:Number,
    // modify 11-05-2020
    listingStatus:string,
    paymentStatus:string
    //<---Sub Categories-->
    fullPlaning:Boolean,
    partPlaning:Boolean,
    coordinator:Boolean,
    //<---Description-->
    tagLine:String,
    description:String,
    //<---Social links-->
    fLink:String,
    tLink:String,
    gLink:String,
    iLink:String,
    pLink:String,
    yVideoLink:String,//<---Youtube Feture video link
    vVideoLink:String,//<---Vimeo Feture video link
    vatNumber:String,
    reviews:[];
    logo:[
        // {
        //     _id:String
        //     title:String,
        //     description:String,
        //     image:String
        // }
    ];
    gallery:[
        // {
        //     _id:String
        //     title:String,
        //     description:String,
        //     image:String
        // }
    ];

}
