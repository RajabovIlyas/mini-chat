import {createRootRouteWithContext, Outlet} from '@tanstack/react-router'
import {AuthContextType} from "../contexts/AuthContext.tsx";


type RouteContext = {
    auth: AuthContextType
}

export const Route = createRootRouteWithContext<RouteContext>()({
    component: () => <Outlet/>,
})
