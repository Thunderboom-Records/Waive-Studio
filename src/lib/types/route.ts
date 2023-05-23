export type Route = {
    href: string;
    label: string;
};

export type HeaderContent = {
    logo: Icon;
}

// export type FooterContent = {
//
// }

export type LandingBannerContent = {
    items: CarouselItem[];
    logos: Icon[];
}

export type LandingVideoContent = {
    title: string;
}

export type LandingPostContent = {
    title: string;
    description: string,
    link: Route,
}

export type LandingStudioContent = {
    apps: LandingStudioApp[]
}

export type LandingStudioApp = {
    title: string;
    description: string,
    links: Route[],
    img: Image
}

export type LandingTutorialsContent = {
    title: string;
}

export type LandingEventsContent = {
    title: string
    img: Image,
}

export type CarouselItem = {
    id: number;
    img?: Image;
}

export type LogoCloud = {
    logos: Icon[];
}

export type Image = {
    src: string;
    alt: string,
    width: string,
    height: string,
}

export type Icon = {
    src: string;
    alt: string,
    href: string,
    width?: string,
    height?: string,
}