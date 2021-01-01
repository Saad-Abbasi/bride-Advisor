import { Component, OnInit } from '@angular/core';
import {Countries} from '../../models/country.model';
import {Regions} from '../../models/regions.model';
import {LoginService} from '../../shared/login/login.service';
import{HttpClient,HttpParams} from '@angular/common/http'
import {SearchData} from '../../models/search/search-data';
import {Router} from '@angular/router'
import { States } from 'ngx-owl-carousel-o/lib/services/carousel.service';


@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {
data:SearchData = {};
breakPoint:any;
indexTab:number = 0;
// category:String
//  address:String;
 public selectedCategory ="";
  isCountrySelected:boolean;
 
    // statesOfIndia: string[] = [
    //   "North ",
    //   "West ",
    //   "South",
    //   "East",
    //   "Northeast",
    //   "Central india"
    // ];
 
  regions: Regions[];

  
  constructor(private _loginService:LoginService, 
              private http:HttpClient,
              private _router:Router
              ) { }
  
 onChangeCountry(id:number){
   
  if(id == 1){
    this.isCountrySelected = false;
   this.regions = [   
   {Cid:1,id:1,name:'Alabama'},
   {Cid:1,id:2,name:'Alaska'},
   {Cid:1,id:3,name:'American Samoa'},
   {Cid:1,id:4,name:'Arizona'},
     
    ]
  }
 }
  ngOnInit(): void {
    // tLink="abctwfupdated"
    // website="www.mcqser.com"
    this.isCountrySelected = true;
    this.breakPoint = (window.innerWidth <= 400) ? 2 : 4;

  }
  selectCategory(catValue:any,event){
    this.indexTab = 1;
    this.selectedCategory = event.srcElement.alt; //update button with current event
    this.data.category = catValue; //send value for search
    
  }
  findRegion = (region:any)=>{
    var searchText  =  region.target.innerText;
    searchText = searchText.replace(/\s+/g, '-').toLowerCase();
    this.data.address = searchText;
    
    // console.log(this.data);
    // console.log('Selected list option is selected',region.target.innerText)
    this.searchListing();
   
  }




 searchListing(){
  this._router.navigate(['/search-view'], 

  { queryParams: { category: this.data.category,address:this.data.address } 

  });

 }
 //responsive 
 onResize(event) {
  this.breakPoint = (event.target.innerWidth <= 400) ? 2 : 4;
}

//Data of states

//            Africa

statesOfSouthAfrica: string[] = [
  "Eastern Cape",
  "Garden Route",
  "Gauteng",
  "Greater Kruger Region",
  "Madikwe & the North",
  "Northern Cape",
  "Western Cape"
];

//                india
statesOfIndia: string[] = [
  "North ",
  "West ",
  "South",
  "East",
  "Northeast",
  "Central india"
];
 // ..................Japan
statesOfJapan: string[] = ["Hokkaido","Tohoku","Kanto/Tokyo and surrounding area","Chubu","Kansai","Chugoku","Shikoku","Kyushu","Okinawa"];

//                    Russia

statesOfRussia: string[] = ["Central European Region","North and Northwest European Region","Volga Region","North Caucasus","Ural Region","Western Siberia","Eastern Siberia","Northern and Northwestern Siberia","Russian Far East"];
 
//                      UAE
statesOfUAE: string[] = ["Abu Dhabi  ","Ajman ","Dubai ","Fujairah","Ras Al Khaimah","Sharjah ","Umm Al Quwain"];

//                     Astria
statesOfAstria: string[] = ["Vorarlberg","Tirol ","Salzburg ","Upper Austria ","Lower Austria ","Vienna ","Styria ","Carinthia ","Burgenland"];

//                     cyprus
statesOfCyprus: string[] = ["Paphos","Ayia Napa ","Protaras ","Limassol"];

//                     Czech Republic 
statesOfCzechRepublic: string[] = ["Karlovy Vary Region","Liberec Region","Moravian- Silesian Region","The Pardubice Region ","The Ústí Region  ","Vysočina Region  ","Zlín Region  ","South Bohemian Region ","Hradec Králové Region","The Olomouc Region","The Pilsen Region ","Central Bohemia Region ","Southern Moravia Region"];

//                        France 
statesOfFrance  :string[] = ["Auvergne - Rhone-Alpes","Bretagne (Brittany)","Bourgogne - Franche-Comte","Corse (Corsica)","Centre - Val de Loire","Grand Est (Alsace, Champagne, Lorraine)","Hauts de France ( Nord Pas-de-Calais - Picardie)","Ile de France (Paris)","Nouvelle Aquitaine (Aquitaine, Poitou-Charentes, Limousin)","Normandie","Occitanie (Midi-Pyrenees, Languedoc)","Pays de la Loire","Provence - Cote d Azur"];

//                       Germany
statesOfGermany: string[] = ["Berlin","Bayern (Bavaria)","Niedersachsen (Lower Saxony)","Baden-Württemberg","Rheinland-Pfalz (Rhineland-Palatinate)","Sachsen (Saxony)","Thüringen (Thuringia)","Hessen","Nordrhein-Westfalen (North Rhine-Westphalia)","Sachsen-Anhalt (Saxony-Anhalt)","Brandenburg","Mecklenburg-Vorpommern","Hamburg","Schleswig-Holstein","Saarland","Bremen"];

//                       Greece
statesOfGreece: string[] = ["Athens","Corfu Island","Crete Island","Folegandros Island","Kea Island","Mykonos Island","Paros Island","Rhodes Island","Santorini Island","Sifnos Island","Skiathos Island","Spetses Island","Syros Island","Zante Island"];


//                     Republic of Ireland 
// statesOfRepublicOfIreland: string[] = ["Leinster: ","Munster: ","Connacht: ","Ulster: "];

Leinster:string[] = ["Carlow","Dublin ","Wexford","Wicklow","Louth","Kildare ","Meath ","Westmeath","Kilkenny","Laois ","Offaly","Longford"];
Munster:string[] = ["Clare ","Cork","Kerry","Limerick ","Tipperary","Waterford"];
Connacht:string[]= ["Galway","Leitrim","Mayo","Roscommon","Sligo"];
Ulster:string[]=["Cavan","Donegal ","Monaghan"];



//                     Italy
statesOfItaly: string[] = ["Abruzzo  ","Basilicata ","Calabria ","Campania ","Emilia-Romagna ","Friuli-Venezia Giulia","Lazio (Rome) ","Liguria ","Lombardy (Lake Como & west Lake Garda) ","Marche  ","Molise ","Piedmont ","Puglia  ","Sardinia","Sicily","Tuscany","Trentino-Alto Adige ","Umbria ","Valle d’Aosta  ","Venice (east Lake Garda)"];

//                 Malta
statesOfMalta: string[] = ["Gozo","Malta Majjistral ","Malta Xlokk"];

//                  Portugal
statesOfPortugal: string[] = ["Algarve","Albufeira","Alentejo","Braga","Coimbra","Douro Valley","Lagos","Lisbon","Porto"];

//                 Spain
statesOfSpain: string[] = ["Barcelona","Granada","Lanzarote","Madrid","Majorca","Màlaga","Seville","Tenerife"];

//                United Kingdom 

// statesOfUK:string[] = ["England","Northern  Ireland",,"","Scotland"];
England:string[] = ["Bath and North East Somerset","Bedfordshire","Berkshire","Bristol","Buckinghamshire","Cambridgeshire","Cheshire","Cornwall","County Durham","Cumbria","Derbyshire","Devon","Dorset","East Riding of Yorkshire","East Sussex","Essex","Gloucestershire","Greater London","Greater Manchester","Hampshire","Herefordshire","Hertfordshire","Isle of Man","Isle of Wight","Isles of Scilly","Kent","Lancashire","Leicestershire","Lincolnshire","Merseyside","Norfolk","North Somerset","North Yorkshire","Northamptonshire","Northumberland","Nottinghamshire","Oxfordshire","Rutland","Shropshire","Somerset","South Gloucestershire","South Yorkshire","Staffordshire","Suffolk","Surrey","Tyne & Wear","Warwickshire","West Midlands","West Sussex","West Yorkshire","Wiltshire","Worcestershire"];
northernIreland:string[] = ["County Antrim","County Armagh","County Derry  Londonderry","County Down","County Fermanagh","County Tyrone"];
Scotland:string[] = ["Aberdeenshire","Angus","Argyll and Bute","Ayrshire and Arran","Banffshire","Berwickshire","Caithness","City of Aberdeen","City of Dundee","City of Edinburgh","City of Glasgow","Clackmannan","Dumfries","Dunbartonshire","East Lothian","Fife","Inverness","Kincardineshire","Lanarkshire","Midlothian","Moray","Nairn","Orkney","Perth and Kinross","Renfrewshire","Ross and Cromarty","Roxburgh, Ettrick and Lauderdale","Shetland","Stirling and Falkirk","Sutherland","The Stewartry of Kirkcudbright","Tweeddale","West Lothian","Western Isles","Wigtown"];

//               Canada
statesOfCanada: string[] = ["Alberta-Calgary","Alberta - Edmonton","British Columbia-Vancouver","British Columbia-Vancouver Island","Manitoba","New Brunswick","Nova Scotia","Ontario","Quebec"];

//              United State Of America
statesOfUSA: string[] = ["Maine ","New Hampshire ","Vermont ","Massachusetts ","Connecticut ","Rhode Island ","New York ","New Jersey ","Pennsylvania ","Delaware ","Maryland ","Virginia ","Florida ","Texas ","Kentucky ","Tennessee ","North Carolina ","South Carolina ","Georgia ","Alabama ","Mississippi ","Arkansas ","Louisiana ","Missouri ","Oklahoma ","Ohio ","Nebraska ","Michigan ","Indiana ","Wisconsin ","Illinois ","Minnesota ","Iowa ","North Dakota ","South Dakota ","Kansas ","Colorado ","New Mexico ","Arizona - Arizona","Arizona - Phoenix","Nevada ","Wyoming ","Montana ","Utah ","Idaho ","Washington ","Oregon ","Alaska ","Hawaii ","West Virginia"];
California:string[] = ["Alameda","Alpine","Amador","Butte","Calaveras","Colusa","Contra Costa","Del Norte","El Dorado","Fresno","Glenn","Humboldt","Imperial","Inyo","Kern","Kings","Lake","Lassen","Los Angeles","Madera","Marin","Mariposa","Mendocino","Merced","Modoc","Mono","Monterey","Napa","Nevada","Orange","Placer","Plumas","Riverside","Sacramento","San Benito","San Bernardino","San Diego","San Francisco","San Joaquin","San Luis Obispo","San Mateo","Santa Barbara","Santa Clara","Santa Cruz","Shasta","Sierra","Siskiyou","Solano","Sonoma","Stanislaus","Sutter","Tehama","Trinity","Tulare","Tuolumne","Ventura","Yolo","Yuba"]
//                Brazil 
statesOfBrazil: string[] = ["Acre","Alagoas","Amazonas","Amapa","Bahia","Ceara","Distrito Federal","Espirito Santo","Goias","Maranhao","Minas Gerais","Mato Grosso do Sul","Mato Grosso","Para","Paraiba","Pernambuco","Piaui","Parana","Rio de Janeiro","Rio Grande do Norte","Rondonia","Roraima","Rio Grande do Sul","Santa Catarina","Sergipe","Sao Paulo","Tocantins"]

//              Newzealand
statesOfNewZealand: string[] = ["Northland","Waikato","Taranaki","Wanganui","Manawatu","Wairarapa"];

//
// New South Wales 
newSouthWale:string[] = ["Blue Mountains","Central Coast","Central Tablelands","Central West","Greater Western Sydney","Far South Coast","Far West","Hunter Region (Newcastle)","Illawarra (Wollongong)","Lord Howe Island","New England (north-west)","Murray","Mid North Coast","North West Slopes","Northern Rivers","Northern Tablelands","Orana","Riverina","Sapphire Coast","Snowy Mountains","South Coast","Southern Highlands","Southern Tablelands","South West Slopes","Sunraysia","Sydney"];

Victoria:string[] = ["Barwon South West region","Gippsland region","Grampians region","Hume region","Loddon Mallee region"];

Queensland:string[] = ["Far North Queensland","North Queensland","Mackay, Isaac, Whitsundays","Central Queensland","Central West Queensland","Wide Bay Burnett","Darling Downs and South West","South East: Sunshine Coast","South East: Gold Coast"];

westernAustralia:string[] = ["Gascoyne","Goldfields-Esperance","Great Southern","Kimberley","Mid West","Peel","Pilbara","South West","Wheatbelt"];

southAustralia:string [] = ["Adelaide Plains","Adelaide Hills Mount Lofty Ranges","Barossa Valley","Eyre Peninsula","Far North","Fleurieu Peninsula","Flinders Ranges","Kangaroo Island","Limestone Coast","Mid North","Clare Valley","Murray Mallee","Murraylands","Riverland","Yorke Peninsula","Copper Triangle"];

Tasmania:string[] = ["Central Highlands","Midlands","West Coast","Hobart"];
}
