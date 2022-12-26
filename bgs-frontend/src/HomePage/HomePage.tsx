import { HomePageCard, IHomePageCard } from "./HomePageCard";
import { navigate } from "../helpers/navigation-helper";
import { INavbarLink, Navbar } from "../shared/Navbar";
import { IJsxElement } from "../types/general-types";
import { HomePageGalery } from "./HomePageGalery";
import { HomePageFooter } from "./HomePageFooter";
import { useNavigate } from "@solidjs/router";
import { For } from "solid-js";
import './HomePage.scss';

export function HomePage(): IJsxElement {
    const cards: IHomePageCard[] = [
        {imgname: 'planning.png', title: 'Első', content: 'Use our powerful mobile-first flexbox grid to build layouts of all shapes and sizes thanks to a twelve column system, six default responsive tiers, Sass variables and mixins, and dozens of predefined classes.'},
        {imgname: 'implementation.png', title: 'Második', content: 'Use our powerful mobile-first flexbox grid to build layouts of all shapes and sizes thanks to a twelve column system, six default responsive tiers, Sass variables and mixins, and dozens of predefined classes.'},
        {imgname: 'installation.png', title: 'Harmadik', content: 'Use our powerful mobile-first flexbox grid to build layouts of all shapes and sizes thanks to a twelve column system, six default responsive tiers, Sass variables and mixins, and dozens of predefined classes.'}
    ]
    const links: INavbarLink[] = [
        {text: 'Rólunk', onclick: () => scrollTo('about-us')},
        {text: 'Mivel foglalkozunk', onclick: () => scrollTo('we-do')},
        {text: 'Galériák', onclick: () => scrollTo('homepage-galery')},
        {text: 'Webshop', onclick: () => navigate(navigator, '/webshop')}
    ]
    const navigator = useNavigate()

    function scrollTo(elementId: string): void {
        document.querySelector(`.home-page-container #${elementId}`)?.scrollIntoView({behavior: 'smooth'})
    }

    return (
        <div class="home-page-container d-flex column">
            <Navbar links={links} />

            <div class="home-image d-flex column justify-center align-center">
                <div class="company-logo-container">
                    <img src="/src/assets/bgs-transparent.png" alt="company logo" />
                </div>
                <h1 class="company-name mt-2">Beegees carpentry</h1>
            </div>

            <div class="home-page-content-container d-flex justify-center">
                <div class="home-page-content">
                    <div id="about-us" class="about-us d-flex column align-center">
                        <h3 class="pb-2">Rólunk</h3>
                        <p class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, ipsam ipsa omnis
                        molestias enim commodi culpa temporibus laboriosam nostrum neque quae quam laudantium aliquam. Praesentium
                        nostrum dolor saepe accusantium possimus.</p>
                    </div>

                    <div id="we-do" class="d-grid card-container g-gap-4 pb-4">
                        <For each={cards}>{card => 
                            <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-center">
                                <HomePageCard card={card} />
                            </div>
                        }</For>
                    </div>

                    <HomePageGalery />
                </div>
            </div>

            <HomePageFooter />
        </div>
    )
}
