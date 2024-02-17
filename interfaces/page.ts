

export type PageProps<SearchParams = {}, Params = {}> = {
    searchParams: SearchParams,
    params: Params
}
export type LayoutProps<SearchParams = {}, Params = {}> = React.PropsWithChildren<{
    searchParams: SearchParams,
    params: Params
}>