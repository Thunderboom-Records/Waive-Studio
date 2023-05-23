import type {Icon, LandingBannerContent, LandingStudioContent, LandingVideoContent} from "$lib/types/route";

export const DummyIcon: Icon = {
    alt: "alt",
    src: "https://tailwindui.com/img/logos/mark.svg?color=white",
    href: "",
}



export const LandingBannerContentDummy: LandingBannerContent = {
    items: [{
        id: 0,
        img: {
            alt: "test 1",
            src: "",
            height: "",
            width: ""
        }},
        {
            id: 1,
            img: {
                alt: "test 2",
                src: "",
                height: "",
                width: ""
            }},
        {
            id: 2,
            img: {
                alt: "test 3",
                src: "",
                height: "",
                width: ""
            }},

    ],
    logos: [
        DummyIcon,
        DummyIcon,
        DummyIcon
    ]
}

export const LandingVideoContentDummy: LandingVideoContent = {
    title: ""

};
export const LandingStudioContentDummy: LandingStudioContent = {
    apps: [
        {
            title: "DAW",
            description: "Sinds de pandemie zijn augmented reality, avatars en kunstmatige intelligentie een steeds grotere rol gaan spelen in de live optredens van nu.",
            links: [
                {label: "play", href: "/studio"},
                {label: "code", href: "https://github.com/Thunderboom-Records/Waive-Studio"},
                {label: "read more", href: "/studio/daw"},
            ],
            img: {
                src: "",
                alt: "daw screenshot",
                width: "1824",
                height: "1080"
            }
        },
        // {
        //     title: "Sequencer",
        //     description: "Sinds de pandemie zijn augmented reality, avatars en kunstmatige intelligentie een steeds grotere rol gaan spelen in de live optredens van nu.",
        //     links: [
        //         {label: "play", href: "#"},
        //         {label: "code", href: "#"},
        //         {label: "read more", href: "#"},
        //     ],
        //     img: {
        //         src: "",
        //         alt: "sequencer screenshot",
        //         width: "1824",
        //         height: "1080"
        //     }
        // },
    ]
}

