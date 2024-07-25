import React from "react";
import CBIcon from "../cb-icon.png";
import MasterCardIcon from "../mastercard-icon.png";
import VisaIcon from "../visa-icon.png";

export default function Footer() {
    return (
        <>
            <footer className={"flex flex-col items-center justify-center bg-[#393939] text-white"}>
                <div className={"bg-black w-full flex flex-col justify-center md:flex-row px-8 py-2 gap-8"}>
                    <div className={"w-full md:w-1/4 flex items-center gap-2"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
                            <path
                                d="M39 48V18C39 17.2044 38.6839 16.4413 38.1213 15.8787C37.5587 15.3161 36.7956 15 36 15H12C11.2044 15 10.4413 15.3161 9.87868 15.8787C9.31607 16.4413 9 17.2044 9 18V48C9 48.7956 9.31607 49.5587 9.87868 50.1213C10.4413 50.6839 11.2044 51 12 51H15M39 48C39 48.7956 38.6839 49.5587 38.1213 50.1213C37.5587 50.6839 36.7956 51 36 51H27M39 48V24C39 23.2044 39.3161 22.4413 39.8787 21.8787C40.4413 21.3161 41.2044 21 42 21H49.758C50.5536 21.0002 51.3165 21.3164 51.879 21.879L62.121 32.121C62.6837 32.6835 62.9998 33.4464 63 34.242V48C63 48.7956 62.6839 49.5587 62.1213 50.1213C61.5587 50.6839 60.7956 51 60 51H57M39 48C39 48.7956 39.3161 49.5587 39.8787 50.1213C40.4413 50.6839 41.2044 51 42 51H45M15 51C15 52.5913 15.6321 54.1174 16.7574 55.2426C17.8826 56.3679 19.4087 57 21 57C22.5913 57 24.1174 56.3679 25.2426 55.2426C26.3679 54.1174 27 52.5913 27 51M15 51C15 49.4087 15.6321 47.8826 16.7574 46.7574C17.8826 45.6321 19.4087 45 21 45C22.5913 45 24.1174 45.6321 25.2426 46.7574C26.3679 47.8826 27 49.4087 27 51M57 51C57 52.5913 56.3679 54.1174 55.2426 55.2426C54.1174 56.3679 52.5913 57 51 57C49.4087 57 47.8826 56.3679 46.7574 55.2426C45.6321 54.1174 45 52.5913 45 51M57 51C57 49.4087 56.3679 47.8826 55.2426 46.7574C54.1174 45.6321 52.5913 45 51 45C49.4087 45 47.8826 45.6321 46.7574 46.7574C45.6321 47.8826 45 49.4087 45 51"
                                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className={"uppercase"}>livraison gratuite en point de retrait dès 150€ d'achats</p>
                    </div>
                    <div className={"w-full md:w-1/4 flex items-center gap-2"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
                            <path
                                d="M15 51C15 52.5913 15.6321 54.1174 16.7574 55.2426C17.8826 56.3679 19.4087 57 21 57C22.5913 57 24.1174 56.3679 25.2426 55.2426C26.3679 54.1174 27 52.5913 27 51C27 49.4087 26.3679 47.8826 25.2426 46.7574C24.1174 45.6321 22.5913 45 21 45C19.4087 45 17.8826 45.6321 16.7574 46.7574C15.6321 47.8826 15 49.4087 15 51ZM45 51C45 52.5913 45.6321 54.1174 46.7574 55.2426C47.8826 56.3679 49.4087 57 51 57C52.5913 57 54.1174 56.3679 55.2426 55.2426C56.3679 54.1174 57 52.5913 57 51C57 49.4087 56.3679 47.8826 55.2426 46.7574C54.1174 45.6321 52.5913 45 51 45C49.4087 45 47.8826 45.6321 46.7574 46.7574C45.6321 47.8826 45 49.4087 45 51Z"
                                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M15 51H9V18C9 17.2044 9.31607 16.4413 9.87868 15.8787C10.4413 15.3161 11.2044 15 12 15H39V33H24M24 33L30 39M24 33L30 27M27 51H45M39 18H54L63 33V51H57"
                                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className={"uppercase"}>retours gratuits</p>
                    </div>
                    <div className={"w-full md:w-1/4 flex items-center gap-2"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
                            <path
                                d="M36 63C50.9117 63 63 50.9117 63 36C63 21.0883 50.9117 9 36 9C21.0883 9 9 21.0883 9 36C9 50.9117 21.0883 63 36 63Z"
                                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M36 21V32.292C36 33.4065 36.3105 34.4989 36.8965 35.4469C37.4826 36.3948 38.3211 37.1608 39.318 37.659L48 42"
                                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className={"uppercase"}>30 jours pour changer d'avis</p>
                    </div>
                    <div className={"w-full md:w-1/4 flex items-center gap-2"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
                            <g clipPath="url(#clip0_7_125)">
                                <path
                                    d="M46.2129 7.80239e-05C45.6591 0.0222319 45.1246 0.121924 44.568 0.260386L6.92305 9.43208C2.47013 10.5232 -0.315718 15.0148 0.778128 19.4705L6.05628 41.0207C6.37612 42.3043 6.99888 43.4927 7.87239 44.4861C8.74591 45.4796 9.84475 46.2493 11.0769 46.7308V41.5385C11.0769 33.9038 17.2883 27.6924 24.9231 27.6924H59.7987L54.6064 6.31669C54.1472 4.45859 53.0613 2.81569 51.5317 1.66503C50.0022 0.514362 48.1255 -0.0736732 46.2129 7.80239e-05ZM49.5858 11.9438L51.8372 21.3758L42.4911 23.6244L40.1538 14.2782L49.5858 11.9438ZM24.9231 33.2309C20.3372 33.2309 16.6154 36.9527 16.6154 41.5385V63.6924C16.6154 68.2782 20.3372 72.0001 24.9231 72.0001H63.6923C68.2781 72.0001 72 68.2782 72 63.6924V41.5385C72 36.9527 68.2781 33.2309 63.6923 33.2309H24.9231ZM24.9231 37.645H63.6923C65.8274 37.645 67.5858 39.4035 67.5858 41.5385V44.3078H21.0295V41.5385C21.0295 39.4035 22.788 37.645 24.9231 37.645ZM21.0295 52.6155H67.5858V63.6924C67.5858 65.8275 65.8274 67.5859 63.6923 67.5859H24.9231C23.8922 67.5801 22.9053 67.168 22.1763 66.4391C21.4474 65.7102 21.0353 64.7232 21.0295 63.6924V52.6155Z"
                                    fill="white"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_7_125">
                                    <rect width="72" height="72" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <p className={"uppercase"}>paiement en 3x ou 4x sans frais</p>
                    </div>
                </div>
                <div className={"w-full flex flex-col justify-center md:flex-row px-8 py-2 gap-8"}>
                    <div className={"w-full md:w-1/4 flex flex-col gap-2 mt-4 mb-4"}>
                        <p className={"font-bold uppercase"}>aide et contact</p>
                        <a href={"/questions fréquentes et contacts"} className={"hover:text-[#f553c7]"}>Questions fréquentes et contacts</a>
                        <p className={"font-bold"}>Contactez-nous :</p>
                        <a href={"mailto:contact@kompozant.com"} className={"hover:text-[#f553c7]"}>&rsaquo; Email</a>
                        <a href={"tel:+33612345678"} className={"hover:text-[#f553c7]"}>&rsaquo; Téléphone</a>
                    </div>
                    <div className={"w-full md:w-1/4 flex flex-col gap-2 mt-4 mb-4"}>
                        <p className={"font-bold uppercase"}>les services</p>
                        <a href={"/modes de livraisons"} className={"hover:text-[#f553c7]"}>Nos modes de livraisons</a>
                        <a href={"/modes de paiement"} className={"hover:text-[#f553c7]"}>Nos modes de paiement</a>
                        <a href={"/modes de retour"} className={"hover:text-[#f553c7]"}>Nos modes de retour</a>
                    </div>
                    <div className={"w-full md:w-1/4 flex flex-col gap-2 mt-4 mb-4"}>
                        <p className={"font-bold uppercase"}>à propos de nous</p>
                        <a href={"/actu"} className={"hover:text-[#f553c7]"}>Actualités</a>
                        <a href={"/kompozant"} className={"hover:text-[#f553c7]"}>Entreprise</a>
                        <a href={"/responsabilités sociétales"} className={"hover:text-[#f553c7]"}>Responsabilité Sociétale</a>
                    </div>
                    <div className={"w-full md:w-1/4 flex flex-col gap-2 mt-4 mb-4"}>
                        <p className={"font-bold uppercase"}>modes de paiement</p>
                        <div className={"flex items-center gap-2"}>
                            <img src={CBIcon} alt={"Carte Bleue"} className="w-8 h-8 object-contain"></img>
                        <p>CB</p>
                        </div>
                        <div className={"flex items-center gap-2"}>
                            <img src={MasterCardIcon} alt={"MasterCard"} className="w-8 h-8 object-contain"></img>
                        <p>MASTERCARD</p>
                        </div>
                        <div className={"flex items-center gap-2"}>
                            <img src={VisaIcon} alt={"Visa"} className="w-8 h-8 object-contain"></img>
                        <p>Visa</p>
                        </div>
                    </div>
                </div>
                <div className={"w-full flex flex-col justify-center md:flex-row px-8 py-2 gap-8"}>
                    <div className={"w-full h-0.5 rounded-full bg-white"}></div>
                </div>
                <div className="w-full flex flex-col md:flex-row px-8 py-2 gap-8">
                    <div className="w-full flex flex-wrap gap-2">
                        <a href="/cgv" className="hover:text-[#f553c7]">CGV Kompozant</a>
                        <p>•</p>
                        <a href="/cgu" className="hover:text-[#f553c7]">CGU Kompozant</a>
                        <p>•</p>
                        <a href="/conditions des offres" className="hover:text-[#f553c7]">*Conditions des Offres</a>
                        <p>•</p>
                        <a href="/conditions des facilités de paiement" className="hover:text-[#f553c7]">**Conditions des Facilités de Paiement</a>
                    </div>
                </div>
            </footer>
        </>
    )
}