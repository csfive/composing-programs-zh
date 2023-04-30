export default function () {
    return [
        {
            text: '简介', link: '/sicp-python-projects/intro' 
        },
        {
            text: '项目1: 贪吃猪',
            collapsible: true,
            collapsed: false,
            items: [
                { text: '引言', link: '/sicp-python-projects/Hog/Introduction' },
                { text: '阶段1 模拟器', link: '/sicp-python-projects/Hog/Simulator' },
                { text: '阶段2 解说', link: '/sicp-python-projects/Hog/Commentary' },
                { text: '阶段3 策略', link: '/sicp-python-projects/Hog/Strategies' },
            ]
        },
    ]
}