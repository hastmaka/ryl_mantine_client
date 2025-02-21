import SContainer from "@/component/SContainer.jsx";
import {Flex, Stack} from "@mantine/core";
import BlogTitle from "@/view/blog/BlogTitle.jsx";
import {BlogController} from "@/view/blog/BlogController.js";
import {generalSignal} from "@/signal/generalSignal.js";
import BlogGrid from "@/view/blog/blogGrid/BlogGrid.jsx";
import BlogGridPagination from "@/view/blog/blogGrid/BlogGridPagination.jsx";
import BlogTag from "@/view/blog/blogTag/BlogTag.jsx";
import EzSearchInputCustom from "@/ezMantine/searchInput/EzSearchInputCustom.jsx";
import BlogLastArticles from "@/view/blog/BlogLastArticles.jsx";

const articles = [
    {
        title: "10 Tips for Boosting Your Productivity",
        author: "Jane Doe",
        date: "2024-12-24",
        summary: "Discover practical tips to increase your productivity and stay on top of your tasks.",
        tags: ["productivity", "self-improvement", "time-management"],
        url: "https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: [
            {header: "Boost Your Productivity"},
            {enunciate: "Time Blocking, Organize your day using time blocking for maximum output."},
            {text: ["Set clear goals for the day to maintain focus and direction.", "Avoid multitasking; focus on one task at a time."]},
            {enunciate: "Take Breaks, Short breaks help refresh your mind and increase efficiency."},
            {text: 'Download our productivity tools guide.'},
            {link: {
                href: "https://ryl.vegas",
                label: "Download our productivity tools",
            }},
            {text: "Declutter your workspace to reduce distractions."},
            {enunciate: "Learn to Say No, Prioritize your tasks and decline unnecessary commitments."},
            {text: "Use technology wisely to automate repetitive tasks."},
            {important: "Consistency is key to building productive habits over time."}
        ]
    },
    {
        title: "The Future of Remote Work: Trends to Watch in 2025",
        author: "John Smith",
        date: "2024-12-23",
        summary: "Explore the evolving trends in remote work and how businesses are adapting to the new normal.",
        tags: ["remote work", "business", "technology"],
        url: "https://plus.unsplash.com/premium_photo-1683121716061-3faddf4dc504?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "5 Healthy Habits for a Better Lifestyle",
        author: "Emily Brown",
        date: "2024-12-22",
        summary: "Adopt these simple, healthy habits to improve your physical and mental well-being.",
        tags: ["health", "wellness", "lifestyle"],
        url: "https://plus.unsplash.com/premium_photo-1726869681528-75a146b1e197?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Why Every Business Needs a Digital Marketing Strategy",
        author: "Michael Davis",
        date: "2024-12-21",
        summary: "Learn why having a digital marketing strategy is crucial for business success in the modern world.",
        tags: ["digital marketing", "business", "strategy"],
        url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "How to Build a Personal Brand on Social Media",
        author: "Sarah Lee",
        date: "2024-12-20",
        summary: "Master the art of personal branding and use social media to establish a unique online presence.",
        tags: ["social media", "branding", "marketing"],
        url: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        title: "The Benefits of Meditation for Mental Clarity",
        author: "David Johnson",
        date: "2024-12-19",
        summary: "Explore how meditation can help you achieve mental clarity and reduce stress in your daily life.",
        tags: ["meditation", "mental health", "wellness"],
        url: "https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlY2h8ZW58MHx8MHx8fDA%3D"
    },
    {
        title: "The Best Travel Destinations for 2025",
        author: "Anna Wilson",
        date: "2024-12-18",
        summary: "Discover the top travel destinations for 2025, from exotic beaches to bustling cities.",
        tags: ["travel", "vacation", "destinations"],
        url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRlY2h8ZW58MHx8MHx8fDA%3D"
    },
    {
        title: "How to Improve Your Public Speaking Skills",
        author: "Chris Taylor",
        date: "2024-12-17",
        summary: "Enhance your public speaking abilities with these actionable tips for delivering powerful speeches.",
        tags: ["public speaking", "skills", "communication"],
        url: "https://images.unsplash.com/photo-1504610926078-a1611febcad3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRlY2h8ZW58MHx8MHx8fDA%3D"
    },
    {
        title: "Understanding Cryptocurrency and Blockchain Technology",
        author: "Mark Stevens",
        date: "2024-12-16",
        summary: "Get a beginner’s guide to understanding the world of cryptocurrency and the underlying blockchain technology.",
        tags: ["cryptocurrency", "blockchain", "technology"],
        url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHRlY2h8ZW58MHx8MHx8fDA%3D"
    },
    {
        title: "The Importance of Sustainability in Business",
        author: "Rachel Green",
        date: "2024-12-15",
        summary: "Learn how businesses can adopt sustainable practices and why it’s important for the future of the planet.",
        tags: ["sustainability", "business", "environment"],
        url: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHRlY2h8ZW58MHx8MHx8fDA%3D"
    }
];

export default function Blog() {
    const {screen} = generalSignal

    return (
        <SContainer bg='#ffffff' id='blog' mih='100vh'>
            <BlogTitle/>

            <Flex
                gap='1rem'
                direction={screen < 760 ? 'column' : 'row'}
            >
                <Stack flex={2}>
                    <BlogGrid/>
                    <BlogGridPagination/>
                </Stack>


                <Stack flex={1} gap='2rem'>
                    {/*<EzSearchInputCustom state={BlogController} clearable/>*/}
                    <BlogTag/>
                    <BlogLastArticles/>
                </Stack>
            </Flex>
        </SContainer>
    );
}
