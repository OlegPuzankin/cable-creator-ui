import React from 'react';
import './Dashboard.scss'
import { useRouteMatch, Switch, Route, NavLink, Redirect } from 'react-router-dom'
import { CablesTable } from "../../components/CableForm/CablesTable";
import { ConnectorsTable } from "../../components/ConnectorForm/ConnectorsTable";

export const DashboardPage = () => {

    const { url } = useRouteMatch()
    return (


        <div className='flex flex-col text-sm '>

            <div className='dashboard-selector-row'>

                <NavLink
                    className='item-link '
                    activeClassName='item-link-selected'
                    to={`${url}/cables`}>
                    Cables
                    </NavLink>

                <NavLink
                    className='item-link'
                    activeClassName='item-link-selected'
                    to={`${url}/connectors`}>
                    Connectors
                    </NavLink>



            </div>
            <div className='w-full bg-white'>
                <Switch>
                    <Route path={`${url}/cables`} component={CablesTable} />
                    <Route path={`${url}/connectors`} component={ConnectorsTable} />
                    <Redirect to={`${url}/cables`} component={CablesTable} />
                </Switch>
            </div>

        </div>
    );
};