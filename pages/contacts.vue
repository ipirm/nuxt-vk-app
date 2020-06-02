<template>
	<div class="container">
		<div class="overlay-image">
			<div class="overlay-image-left">
				<nuxt-link to="/">
					<div class="tabs-link">
						<img src="/header/vk.png">
					</div>
				</nuxt-link>
			</div>
			<div class="overlay-image-item">
				<img src="/photo.png">
			</div>
			<div class="overlay-image-left">
				<a href="#" @click.prevent="toggleSettings">
					<div class="tabs-link">
						<img src="/main-page/add.png">
					</div>
				</a>
			</div>
		</div>
		<div class="overlay-image-item-capture">
			<span class="overlay-image-item-work">{{getRole}}</span>
			<span class="overlay-image-item-name">{{ user.firstName}} {{ user.lastName}}</span>
			<span class="overlay-image-item-location">{{ user.city}}</span>
		</div>
	<div class="contacts-page">
		<h1>Контакты</h1>
		 <div class="main-tabs container">
	        <div class="main-tabs__top">
	            <button :class="{ active: active == 1 }" @click="active = 1">
	                <img v-if="active === 1" src="/contacts/my-contacts-active.png">
	                <img v-else src="/contacts/my-contacts-passive.png">
	                <span v-if="active === 1">Мои контакты</span>
	            </button>
	            <button :class="{ active: active == 2 }" @click="active = 2">
	                <img v-if="active === 2" src="/contacts/contacts-active.png">
	                <img v-else src="/contacts/contacts-passive.png">
	                <span v-if="active === 2">Контакты</span>
	            </button>
	        </div>
	        <div class="main-tabs__top__bg-shadow"></div>
	        <div class="main-tabs__content contacts-page-content" v-if="active == 1">
	        	<div class="contacts-page-contacts">
	        		<div class="problems-card people-card">
                		<div class="problems-card-simple">
                    		<div class="people-card-pic-area">
                				<img src="~/static/problems/pic.png">
                    		</div>
                    		<div class="contacts-page-contact-info">
                    			<span class="name">Имя Имя</span>
                    			<span class="title">частник</span>
                    		</div>
                			<a href="" class="contacts-page-contact-button">
					            <img src="~/static/write.png">
					        </a>
					    </div>
                	</div>
	        		<div class="problems-card people-card">
                		<div class="problems-card-simple">
                    		<div class="people-card-pic-area">
                				<img src="~/static/problems/pic.png">
                    		</div>
                    		<div class="contacts-page-contact-info">
                    			<span class="name">Имя Имя</span>
                    			<span class="title">частник</span>
                    		</div>
                			<a href="" class="contacts-page-contact-button">
					            <img src="~/static/write.png">
					        </a>
					    </div>
                	</div>
	        	</div>
	        </div>
	        <div class="main-tabs__content contacts-page-content" v-if="active == 2">
	        	<h2 class="contacts-page-added">Люди, добавившие вас в список своих контактов:</h2>
	        	<div class="contacts-page-contacts">
	        		<div class="problems-card people-card">
                		<div class="problems-card-simple">
                    		<div class="people-card-pic-area">
                				<img src="~/static/problems/pic.png">
                    		</div>
                    		<div class="contacts-page-contact-info">
                    			<span class="name">Имя Имя</span>
                    			<span class="title">частник</span>
                    		</div>
                			<a href="" class="contacts-page-contact-button">
					            <img src="~/static/write.png">
					        </a>
					    </div>
                	</div>
	        		<div class="problems-card people-card">
                		<div class="problems-card-simple">
                    		<div class="people-card-pic-area">
                				<img src="~/static/problems/pic.png">
                    		</div>
                    		<div class="contacts-page-contact-info">
                    			<span class="name">Имя Имя</span>
                    			<span class="title">частник</span>
                    		</div>
                			<a href="" class="contacts-page-contact-button">
					            <img src="~/static/write.png">
					        </a>
					    </div>
                	</div>
	        	</div>
	        </div>
	    </div>
	</div>
		<BottomNavigation/>
		<ModalSettings :steps="1" :active="activeSettings" @closemodal="toggleSettings"/>
	</div>
</template>

<script>
    import BottomNavigation from "../components/footer/BottomNavigation";
    import {mapState} from 'vuex'
	import ModalSettings from "~/components/elements/ModalSettings";
	import {works} from "../mockData/data";
	export default {
		async fetch({store}) {
			await store.dispatch('contact/getMyContact');
			await store.dispatch('contact/getAnother');
		},
		components: {BottomNavigation,ModalSettings},
		data() {
            return {
                active: 1,
				activeSettings: false,
            }
        },
		methods: {
			toggleSettings() {
				this.activeSettings = !this.activeSettings
			},
		},
		computed: {
			...mapState('auth', ['user']),
			...mapState('contact', ['myContacts','anotherContacts']),
			getRole(){
				const role =  works.find(v => v.label === this.user.economicRole)
				return role.title
			}
		},
    }
</script>
