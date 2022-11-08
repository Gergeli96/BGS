import { WebshopItemGroupForm } from './Admin/WebshopItemGroupForm';
import { WebshipItemGroups } from './Admin/WebshopItemGroups';
import { AuthContext, BitAuth } from './Authentication/auth';
import { WebshopItemForm } from './Admin/WebshopItemForm';
import { AdminGuard } from './Authentication/AdminGuard';
import { Notifications } from './shared/Notifications';
import { EditImages } from './Admin/Images/EditImages';
import { Webshopitems } from './Admin/WebshopItems';
import { WebshopItem } from './Webshop/WebshopItem';
import { Component, createSignal } from 'solid-js';
import { WebshopCart } from './shared/WebshopCart';
import { GalerieForm } from './Admin/GalerieForm';
import { Route, Routes } from '@solidjs/router';
import { HomePage } from './HomePage/HomePage';
import { Galeries } from './Galerie/Galeries';
import { Webshop } from './Webshop/Webshop';
import './App.module.scss';

export const [cart, setCart] = createSignal<number[]>([])

export const App: Component = () => {
    return (
        <div class="app-container">
            <div id="modal-anchor"></div>
             <Routes>
                <Route path="/" component={HomePage} />
                <Route path="/webshop" component={Webshop} />
                <Route path="/webshopitem/:id" component={WebshopItem} />
                <Route path="/webshopcart" component={WebshopCart} />
                <Route path="/galeries" component={Galeries} />
                <AuthContext.Provider value={new BitAuth()}>
                    <Route path="/admin" component={AdminGuard} >
                        <Route path="/galerieform" component={GalerieForm} />
                        <Route path="/webshopitem" component={WebshopItemForm} />
                        <Route path="/webshopitem/:id" component={WebshopItemForm} />
                        <Route path="/webshopitems" component={Webshopitems} />
                        <Route path="/webshopitemgroup" component={WebshopItemGroupForm} />
                        <Route path="/webshopitemgroup/:id" component={WebshopItemGroupForm} />
                        <Route path="/webshopitemgroups" component={WebshipItemGroups} />
                        <Route path="/editimages" component={EditImages} />
                    </Route>
                </AuthContext.Provider>
            </Routes>

            <Notifications />
        </div>
    )
}
