import {useRouter} from "next/router";
import NProgress from "nprogress";
import {useEffect} from "react";


export const useLoader = () => { // кастомный хук отображения прогресс бара
    const router = useRouter() // доступ к объекту роутера в Next

    useEffect(()=> {
        const startLoading = () => NProgress.start() // функция отобразить прогресс бар
        const endLoading = () => NProgress.done()// функция убрать прогресс бар

        router.events.on('routeChangeStart', startLoading)
        router.events.on('routeChangeComplete', endLoading)
        router.events.on('routeChangeError', endLoading)

        return () => {
            router.events.off('routeChangeStart', startLoading)
            router.events.off('routeChangeComplete', endLoading)
            router.events.off('routeChangeError', endLoading)
        }
    },[router])

}