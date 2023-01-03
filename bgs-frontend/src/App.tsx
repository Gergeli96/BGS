import { FurnitureCategoryForm } from './Admin/FurnitureCategoryForm';
import { WebshopItemGroupForm } from './Admin/WebshopItemGroupForm';
import { WebshipItemGroups } from './Admin/WebshopItemGroups';
import { AuthProvider } from './Authentication/AuthProvider';
import { Component, createSignal, onMount } from 'solid-js';
import { WebshopItemForm } from './Admin/WebshopItemForm';
import { AdminGuard } from './Authentication/AdminGuard';
import { Notifications } from './shared/Notifications';
import { EditImages } from './Admin/Images/EditImages';
import { GalerieDelete } from './Admin/GalerieDelete';
import { Webshopitems } from './Admin/WebshopItems';
import { WebshopItem } from './Webshop/WebshopItem';
import { WebshopCart } from './shared/WebshopCart';
import { GalerieForm } from './Admin/GalerieForm';
import { EditAccount } from './Admin/EditAccount';
import { Route, Routes } from '@solidjs/router';
import { HomePage } from './HomePage/HomePage';
import { Login } from './Authentication/Login';
import { Galeries } from './Galerie/Galeries';
import { Webshop } from './Webshop/Webshop';
import { Post } from './helpers/http';
import './App.module.scss';

export const [cart, setCart] = createSignal<number[]>([])

const App: Component = () => {
    const visitorLocalstorageKey: string = 'VISITORKEY'

    onMount(() => {
        let visitorDate = localStorage.getItem(visitorLocalstorageKey)
        const today = new Date()
        
        if ((visitorDate === null || visitorDate === undefined) || typeof visitorDate === 'string' && today > new Date(visitorDate)) {
            Post('app/siteinfo', { }, {showNotification: false})
                .then(() => localStorage.setItem(visitorLocalstorageKey, `${today.getFullYear()}-${today.getMonth()}-${today.getDate()} 23:59:59`))
                .catch(error => { })
        }
    })

    return (
        <AuthProvider>
            <div class="app-container">
                <div id="modal-anchor"></div>

                <Routes>
                    <Route path="/" component={HomePage} />
                    <Route path="/webshop" component={Webshop} />
                    <Route path="/webshopitem/:id" component={WebshopItem} />
                    <Route path="/webshopcart" component={WebshopCart} />
                    <Route path="/galeries" component={Galeries} />
                    <Route path="/login" component={Login} />
                    <Route path="/admin" component={AdminGuard} >
                        <Route path="/galerieform" component={GalerieForm} />
                        <Route path="/galeriedelete" component={GalerieDelete} />
                        <Route path="/webshopitem" component={WebshopItemForm} />
                        <Route path="/webshopitem/:id" component={WebshopItemForm} />
                        <Route path="/webshopitems" component={Webshopitems} />
                        <Route path="/webshopitemgroup" component={WebshopItemGroupForm} />
                        <Route path="/webshopitemgroup/:id" component={WebshopItemGroupForm} />
                        <Route path="/webshopitemgroups" component={WebshipItemGroups} />
                        <Route path="/editimages" component={EditImages} />
                        <Route path="/editaccount" component={EditAccount} />
                        <Route path="/furniturecategory" component={FurnitureCategoryForm} />
                    </Route>
                </Routes>

                <Notifications />
            </div>
        </AuthProvider>
    )
}

export default App
