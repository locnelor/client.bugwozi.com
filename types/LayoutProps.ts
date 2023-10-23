export type LayoutProps = React.PropsWithChildren<{
    params: { locale: string } & { [k in string]: string }
}>