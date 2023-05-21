export type Route = {
    href: string;
    label: string;
};

export type LandingPostContent = {
    title: string;
    description: string,
    link: Route,
}

export type LandingStudioCardContent = {
    title: string;
    description: string,
    links: Route[],
    img: Image
}

export type LandingEventsContent = {
    title: string
    img: Image,
}

export type Image = {
    src: string;
    alt: string,
    width: string,
    height: string,
}