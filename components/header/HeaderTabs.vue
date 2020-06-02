<template>
    <div class="overlay-tabs">
        <nuxt-link to="/">
            <div class="tabs-link">
            <img src="/header/vk.png">
        </div>
            <span class="tabs-link-text">
            Страница <br> вконтакте
            </span>
        </nuxt-link>
        <nuxt-link to="/">
            <div class="tabs-link">
                <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_i)">
                        <g clip-path="url(#clip0)">
                            <path d="M15.677 31.5548V39.8646C15.677 40.4451 16.0497 40.9593 16.6015 41.142C16.7395 41.1868 16.881 41.2083 17.0208 41.2083C17.44 41.2083 17.8449 41.0113 18.1029 40.6601L22.9637 34.0453L15.677 31.5548Z"
                                  fill="white"/>
                            <path d="M42.4352 0.248346C42.0231 -0.0436957 41.482 -0.0831124 41.0341 0.151596L0.721633 21.2037C0.24505 21.4527 -0.0362419 21.9616 0.00317474 22.4973C0.0443831 23.0348 0.400925 23.4934 0.907966 23.6672L12.1148 27.4978L35.9816 7.09072L17.5131 29.3414L36.2952 35.761C36.4349 35.8076 36.5818 35.8326 36.7288 35.8326C36.9724 35.8326 37.2143 35.7663 37.4275 35.6373C37.7679 35.4295 37.999 35.0801 38.0582 34.6878L42.9853 1.54193C43.0587 1.04026 42.8473 0.542179 42.4352 0.248346Z"
                                  fill="white"/>
                        </g>
                    </g>
                    <defs>
                        <filter id="filter0_i" x="0" y="0" width="43" height="45" filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="2"/>
                            <feGaussianBlur stdDeviation="2.5"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                            <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
                        </filter>
                        <clipPath id="clip0">
                            <rect width="43" height="43" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <span class="tabs-link-text">
            Написать
            </span>
        </nuxt-link>
        <nuxt-link to="/">
            <div class="tabs-link">
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_i)">
                        <path d="M36.75 5.25H32.8125V1.3125C32.8125 0.588 32.2245 0 31.5 0H7.875C5.70412 0 3.9375 1.76662 3.9375 3.9375V36.75C3.9375 39.6454 6.29212 42 9.1875 42H36.75C37.4745 42 38.0625 41.412 38.0625 40.6875V6.5625C38.0625 5.838 37.4745 5.25 36.75 5.25ZM30.1875 32.8125C30.1875 33.537 29.5995 34.125 28.875 34.125H13.125C12.4005 34.125 11.8125 33.537 11.8125 32.8125V30.1875C11.8125 26.5676 14.7577 23.625 18.375 23.625H23.625C27.2449 23.625 30.1875 26.5676 30.1875 30.1875V32.8125ZM15.75 15.75C15.75 12.8546 18.1046 10.5 21 10.5C23.8954 10.5 26.25 12.8546 26.25 15.75C26.25 18.6454 23.8954 21 21 21C18.1046 21 15.75 18.6454 15.75 15.75ZM30.1875 5.25H7.875C7.1505 5.25 6.5625 4.662 6.5625 3.9375C6.5625 3.213 7.1505 2.625 7.875 2.625H30.1875V5.25Z"
                              fill="white"/>
                    </g>
                    <defs>
                        <filter id="filter0_i" x="0" y="0" width="42" height="44" filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="2"/>
                            <feGaussianBlur stdDeviation="2.5"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                            <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
                        </filter>
                    </defs>
                </svg>
            </div>
            <span class="tabs-link-text">
            Добавить в<br>
               мои контакты
            </span>
        </nuxt-link>
    </div>
</template>

<script>
    export default {
        name: "HeaderTabs"
    }
</script>

<style scoped>

</style>
