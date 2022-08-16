import { AuthChangeEvent, createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { environment } from "../../environments/environment";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    private supabase: SupabaseClient

    constructor() {
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
    }


    public get client(): SupabaseClient {
        return this.supabase
    }

    public get user() {
        return this.supabase.auth.user()
    }

    public get session(): Session | null {
        return this.supabase.auth.session()
    }

    public get profile() {
        return this.supabase
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', this.user?.id)
            .single();
    }

    public authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
        return this.supabase.auth.onAuthStateChange(callback)
    }

    public signIn(email: string, password: string): Promise<any> {
        return this.supabase.auth.signIn({email, password}, {shouldCreateUser: false})
    }

    public signUp(email: string, password: string): Promise<any> {
        return this.supabase.auth.signUp({email, password})
    }

    public signOut() {
        return this.supabase.auth.signOut()
    }

    // public static getGalerieFileUrl(galeriefile: IGaleryFile): string {
    //     if (galeriefile == null || galeriefile == undefined) return ''
        
    //     return environment.supabaseUrl.replace('supabase.co', `supabase.in/storage/v1/object/public/${galeriefile?.filepath}`)
    // }
}
