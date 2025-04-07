import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../pages/Dashboard';

const AppDrawer = createDrawerNavigator();

function AppRoutes(){
    return(
        <AppDrawer.Navigator>
            <AppDrawer.Screen
                name="Dashboard"
                component={Dashboard}
            />
        </AppDrawer.Navigator>
    )
}

export default AppRoutes;