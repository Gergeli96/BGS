import { WebshopItemGroupForm } from './Admin/WebshopItemGroupForm';
import { WebshipItemGroups } from './Admin/WebshopItemGroups';
import { WebshopItemForm } from './Admin/WebshopItemForm';
import { EditImages } from './Admin/Images/EditImages';
import { Webshopitems } from './Admin/WebshopItems';
import { WebshopItem } from './Webshop/WebshopItem';
import { Route, Routes } from '@solidjs/router';
import { HomePage } from './HomePage/HomePage';
import { Webshop } from './Webshop/Webshop';
import type { Component } from 'solid-js';
import { Admin } from './Admin/Admin';
import './App.module.scss';

const App: Component = () => {
    return (
        <div class="app-container">
             <Routes>
                <Route path="/" component={HomePage} />
                <Route path="/webshop" component={Webshop} />
                <Route path="/webshopitem" component={WebshopItem} />
                <Route path="/admin" component={Admin} >
                    <Route path="/webshopitem" component={WebshopItemForm} />
                    <Route path="/webshopitems" component={Webshopitems} />
                    <Route path="/webshopitemgroup" component={WebshopItemGroupForm} />
                    <Route path="/webshopitemgroups" component={WebshipItemGroups} />
                    <Route path="/editimages" component={EditImages} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
