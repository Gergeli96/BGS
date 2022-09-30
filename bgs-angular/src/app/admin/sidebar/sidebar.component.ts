import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

interface ISidebarMenuItem {
    submenu: ISidebarMenuItem[]
    route: string
    name: string
    icon: string
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    @ViewChild('sidebarElement', {static: true}) sidebarElement: ElementRef<HTMLElement>
    private navigationSubscription: Subscription
    public menuItems: ISidebarMenuItem[] = [
        {
            name: 'naptár',
            route: '/admin/calendar',
            icon: 'bi bi-calendar2-range-fill',
            submenu: []
        },
        {
            name: 'Galéria létrehozás',
            route: '/admin/galeryupload',
            icon: 'bi bi-file-earmark-arrow-up-fill',
            submenu: []
        },
        {
            name: 'Galériák',
            route: '/admin/galeries',
            icon: 'bi bi-images',
            submenu: []
        },
        {
            name: 'Projektek',
            route: '/admin/projects',
            icon: 'bi bi-archive-fill',
            submenu: []
        },
        {
            name: 'Webshop',
            route: '-',
            icon: 'bi bi-cart-fill',
            submenu: [
                {
                    name: 'Új elem csoport',
                    route: '/admin/webshop/createelementgroup',
                    icon: 'bi bi-collection-fill',
                    submenu: []
                },
                {
                    name: 'Új elem',
                    route: '/admin/webshop/createelement', 
                    icon: 'bi bi-cart-plus',
                    submenu: []
                },
                {
                    name: 'Meglévő elemek',
                    route: '/admin/webshop/elements',
                    icon: 'bi bi-cart4',
                    submenu: []
                }
            ]
        }
    ]

    constructor(
        public user: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (window.innerWidth <= 700) {
            this.sidebarElement.nativeElement.classList.add('closed')
        }

        this.navigationSubscription = this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe(event => this.setActiveMenuToActive((event as NavigationEnd).url))
    }

    ngAfterViewInit(): void {
        this.setActiveMenuOnLoad()
    }

    ngOnDestroy(): void {
        this.navigationSubscription?.unsubscribe()
    }


    public toggle(): void {
        if (this.sidebarElement.nativeElement.classList.contains('closed')) {
            this.sidebarElement.nativeElement.classList.remove('closed')
        }
        else {
            this.sidebarElement.nativeElement.classList.add('closed')
        }
    }

    public navigate(menuItem: ISidebarMenuItem, menuitemElement?: HTMLElement): void {
        let menuItemContainer = menuitemElement?.closest('.menu-item-container')
        if (menuItem.submenu.length > 0) {
            if (menuItemContainer?.classList.contains('opened')) {
                menuItemContainer?.classList.remove('opened')
            }
            else {
                menuItemContainer?.classList.add('opened')
            }
        }
        else {
            this.router.navigateByUrl(menuItem.route)
        }
    }

    public preventDefault(event: Event): void {
        event.preventDefault()
    }

    public signOut(): void {
        this.user.logOut()
        this.router.navigateByUrl('/')
    }

    private setActiveMenuToActive(url: string): void {
        this.sidebarElement.nativeElement
            .querySelector('.menu-items .menu-item.active')
            ?.classList?.remove('active')

        this.sidebarElement.nativeElement
            .querySelector(`.menu-items .menu-item[route="${url}"]`)
            ?.classList?.add('active')
    }

    private setActiveMenuOnLoad(): void {
        this.setActiveMenuToActive(window.location.pathname)
        const active = this.sidebarElement.nativeElement.querySelector('.menu-items .menu-item.active')
        if (active && active.hasAttribute('submenu')) {
            active.closest('.menu-item-container')?.classList.add('opened')
        }
    }
}
