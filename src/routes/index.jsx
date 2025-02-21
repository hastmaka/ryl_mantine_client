import {useRoutes} from "react-router-dom";
import Layout from "../view/Layout.jsx";
import Home from "../view/home/Home.jsx";
import {lazy} from "react";
import {Suspense} from "react";
import EzLoader from "@/ezMantine/loader/EzLoader.jsx";
import CheckSession from "@/routes/CheckSession.jsx";
// import Test from "../view/test/Test.jsx";
// import CanvasEffect from "../view/services/3serviceGrid/CanvasEffect.jsx";
//dynamic
const AboutUs = lazy(() => import("../view/aboutUs/AboutUs.jsx"));
const Services = lazy(() => import("../view/services/Services.jsx"));
const UseCases = lazy(() => import("../view/useCases/UseCases.jsx"));
const Testimonial = lazy(() => import("../view/testimonial/Testimonial.jsx"));
const ContactUs = lazy(() => import("../view/contactUs/ContactUs.jsx"));
const ItResume = lazy(() => import("../view/extra/ItResume.jsx"));
const FullstackResume = lazy(() => import("../view/extra/FullstackResume.jsx"));
const Blog = lazy(() => import("../view/blog/Blog.jsx"));
const BlogById = lazy(() => import("../view/blog/BlogById.jsx"));
// const Thanks = lazy(() => import("../view/thanks/Thanks.jsx"));
const CrmLogin = lazy(() => import("../view/crm/login/CrmLogin.jsx"));
const CrmMain = lazy(() => import("../view/crm/CrmMain.jsx"));
const Dashboard = lazy(() => import("../view/crm/dashboard/Dashboard.jsx"));
const ArticleGrid = lazy(() => import("../view/crm/article/ArticleGrid.jsx"));
const Tags = lazy(() => import("../view/crm/tags/Tags.jsx"));

export default function Routes() {

    return useRoutes([{
        path: '/',
        element: <Layout/>,
        children: [{
            index: true,
            element: <Home/>,
        }, {
            path: '/services',
            element: <Suspense fallback={<EzLoader h='100vh'/>}><Services/></Suspense>
        }, {
            path: '/about-us',
            element: <Suspense fallback={<EzLoader h='100vh'/>}><AboutUs/></Suspense>
        }, {
            path: '/use-cases',
            element: <Suspense fallback={<EzLoader h='100vh'/>}><UseCases/></Suspense>
        }, {
            path: '/testimonial',
            element: <Suspense fallback={<EzLoader h='100vh'/>}><Testimonial/></Suspense>
        }, {
            path: '/contact-us',
            element: <Suspense fallback={<EzLoader h='100vh'/>}><ContactUs/></Suspense>
        }, {
            path: '/blog',
            element: <Suspense fallback={<EzLoader h='100vh'/>}><Blog/></Suspense>,
        }, {
            path: '/blog/:title/:id',
            element: <Suspense fallback={<EzLoader h='100vh'/>}><BlogById/></Suspense>,
        }, {
            path: '*',
            element: <Home/>
        }, /*{
            path: '/thanks',
            element: <Suspense fallback={<Center h='100vh'><Loader/></Center>}><Thanks/></Suspense>
        }/*{
            path: '/test',
            element: <Test/>
        }*/],
    }, /*{
        path: '/thanks',
        element: <Test/>,
        children: [{
            index: true,
            element: <CanvasEffect/>
        }]
    }*/ {
        path: '/crm-login',
        element: <Suspense fallback={<EzLoader h='100vh'/>}><CrmLogin/></Suspense>,
    }, {
        path: '/crm',
        element: (
            <CheckSession>
                <Suspense fallback={<EzLoader h='100vh'/>}><CrmMain/></Suspense>
            </CheckSession>
        ),
        children: [{
            index: true,
            element: <Suspense fallback={<EzLoader h='100vh'/>}><Dashboard/></Suspense>,
        }, {
            path: 'dashboard',
            element: <Suspense fallback={<EzLoader h='100vh'/>}><Dashboard/></Suspense>,
        }, {
            path: 'articles',
            element: <Suspense fallback={<EzLoader h='100vh'/>}><ArticleGrid/></Suspense>
        }, {
            path: 'tags',
            element: <Suspense fallback={<EzLoader h='100vh'/>}><Tags/></Suspense>
        }]
    }, {
        path: '/luis-castro-it-resume',
        element: <Suspense fallback={<EzLoader h='100vh'/>}><ItResume/></Suspense>
    }, {
        path: '/luis-castro-fullstack-resume',
        element: <Suspense fallback={<EzLoader h='100vh'/>}><FullstackResume/></Suspense>
    }])
}