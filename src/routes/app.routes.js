import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../pages/Dashboard';
import DiarioAlimentar from '../pages/DiarioAlimentar';
import DiarioSintomas from '../pages/DiarioSintomas';
import AcompanharPeso from '../pages/AcompanharPeso';
import LembreteRemedios from '../pages/LembreteRemedios';


const AppDrawer = createDrawerNavigator();

function AppRoutes(){
    return(
        <AppDrawer.Navigator>
            <AppDrawer.Screen
                name="Dashboard"
                component={Dashboard}
            />
            <AppDrawer.Screen
                name="DiarioAlimentar"
                component={DiarioAlimentar}
            />
            <AppDrawer.Screen
                name="DiarioSintomas"
                component={DiarioSintomas}
            />
            <AppDrawer.Screen
                name="AcompanharPeso"
                component={AcompanharPeso}
            />
            <AppDrawer.Screen
                name="LembreteRemedios"
                component={LembreteRemedios}
            />
        </AppDrawer.Navigator>
    )
}

export default AppRoutes;