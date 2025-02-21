import {useRoutes} from 'react-router-dom';
import Layout from '../layout/Layout.jsx';
import Home from '../sections/home/Home.jsx'
import {lazy, Suspense} from 'react';
import EzSpinner from '../components/EzSpinner/EzSpinner.jsx';
import Test from '../sections/test/Test.jsx';

const Services = lazy(() => import('../sections/services/Services.jsx'))
const ServiceById = lazy(() => import('../sections/services/serviceById/ServiceById'))
const Gallery = lazy(() => import('../sections/gallery/Gallery.jsx'))
const Fleet = lazy(() => import('../sections/fleet/Fleet.jsx'))
const Contact = lazy(() => import('../sections/contact/Contact.jsx'))
const About = lazy(() => import('../sections/about/About.jsx'))
const TermsAndConditions = lazy(() => import('../sections/legal/termsAndConditions/TermsAndConditions.jsx'))
const PrivacyPolicy = lazy(() => import('../sections/legal/privacyPolicy/PrivacyPolicy.jsx'))
const CookiesPolicy = lazy(() => import('../sections/legal/cookiesPolicy/CookiesPolicy.jsx'))
const Thanks = lazy(() => import('../sections/thanks/Thanks.jsx'))
const Error = lazy(() => import('../sections/error/Error.jsx'))

export default function Routes() {

    return useRoutes([{
        path: '/',
        element: <Layout/>,
        children: [{
            index: true,
            element: <Home/>,
        }, {
            path: '/',
            element: <Home/>,
        }, {
            path: '/services',
            element: <Suspense fallback={<EzSpinner full/>}><Services/></Suspense>,
        }, {
            path: '/services/:id',
            element: <Suspense fallback={<EzSpinner full/>}><ServiceById/></Suspense>
        }, {
            path: '/gallery',
            element: <Suspense fallback={<EzSpinner full/>}><Gallery/></Suspense>,
        }, {
            path: '/fleet',
            element: <Suspense fallback={<EzSpinner full/>}><Fleet/></Suspense>
        }, {
            path: '/contact-us',
            element: <Suspense fallback={<EzSpinner full/>}><Contact/></Suspense>
        }, {
            path: '/about-us',
            element: <Suspense fallback={<EzSpinner full/>}><About/></Suspense>
        }, {
            path: '/terms-and-conditions',
            element: <Suspense fallback={<EzSpinner full/>}><TermsAndConditions/></Suspense>
        }, {
            path: '/privacy-policy',
            element: <Suspense fallback={<EzSpinner full/>}><PrivacyPolicy/></Suspense>
        }, {
            path: '/cookies-policy',
            element: <Suspense fallback={<EzSpinner full/>}><CookiesPolicy/></Suspense>
        }, {
            path: '/thanks',
            element: <Suspense fallback={<EzSpinner full/>}><Thanks/></Suspense>
        }, {
            path: '/error',
            element: <Suspense fallback={<EzSpinner full/>}><Error/></Suspense>
        }, {
            path: '*',
            element: <Home/>
        }, {
            path: '/test',
            element: <Test/>
        }]
    }])
}