import { WebshopItemGroupForm } from './Admin/WebshopItemGroupForm';
import { WebshipItemGroups } from './Admin/WebshopItemGroups';
import { WebshopItemForm } from './Admin/WebshopItemForm';
import { Notifications } from './shared/Notifications';
import { EditImages } from './Admin/Images/EditImages';
import { Webshopitems } from './Admin/WebshopItems';
import { WebshopItem } from './Webshop/WebshopItem';
import { Component, createSignal } from 'solid-js';
import { WebshopCart } from './shared/WebshopCart';
import { Route, Routes } from '@solidjs/router';
import { HomePage } from './HomePage/HomePage';
import { Webshop } from './Webshop/Webshop';
import { Admin } from './Admin/Admin';
import './App.module.scss';

export const [cart, setCart] = createSignal<number[]>([])

const App: Component = () => {
    return (
        <div class="app-container">
            <div id="modal-anchor"></div>
             <Routes>
                <Route path="/" component={HomePage} />
                <Route path="/webshop" component={Webshop} />
                <Route path="/webshopitem/:id" component={WebshopItem} />
                <Route path="/webshopcart" component={WebshopCart} />
                <Route path="/admin" component={Admin} >
                    <Route path="/webshopitem" component={WebshopItemForm} />
                    <Route path="/webshopitem/:id" component={WebshopItemForm} />
                    <Route path="/webshopitems" component={Webshopitems} />
                    <Route path="/webshopitemgroup" component={WebshopItemGroupForm} />
                    <Route path="/webshopitemgroup/:id" component={WebshopItemGroupForm} />
                    <Route path="/webshopitemgroups" component={WebshipItemGroups} />
                    <Route path="/editimages" component={EditImages} />
                </Route>
            </Routes>

            <Notifications />
        </div>
    );
};

export default App;
