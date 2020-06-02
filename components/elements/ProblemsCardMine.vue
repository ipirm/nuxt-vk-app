<template>
	<div class="problems-card-outer">
		<div class="problems-card">
			<div class="problems-card-simple" v-show="!showEdit" @click="showEdit = true">
		        <div class="pic-area"></div>
		        <div class="info-area"></div>
		    </div>
			<div class="problems-card-edit" v-show="showEdit">
		        <div class="problems-card-tabs">
		        	<div class="problems-card-tabs-item" @click="editTabShown = 1" :class="{ active: editTabShown == 1 }">
		        		<img class="active" src="~/static/problems/others-card-problem-active.svg">
		        		<img class="passive" src="~/static/problems/others-card-problem-passive.svg">
		        		<span>О проблеме</span>
		        	</div>
		        	<div class="problems-card-tabs-item" @click="editTabShown = 2" :class="{ active: editTabShown == 2 }">
		        		<img class="active" src="~/static/problems/others-card-solutions-active.svg">
		        		<img class="passive" src="~/static/problems/others-card-solutions-passive.svg">
		        		<span>Решения</span>
		        	</div>
		        </div>
		        <div class="problems-card-tab about-problem" v-show="editTabShown == 1">
		        	<div class="about-problem-infos">
			        	<div class="about-problem-info">
			        		<span class="about-problem-info-title">Сфера проекта:</span>
			        		<span class="about-problem-info-text">текст</span>
			        	</div>
			        	<div class="about-problem-info">
			        		<span class="about-problem-info-title">Этап развития проекта:</span>
			        		<span class="about-problem-info-text">текст</span>
			        	</div>
			        	<div class="about-problem-info">
			        		<span class="about-problem-info-title">Доход проекта:</span>
			        		<span class="about-problem-info-text">текст</span>
			        	</div>
			        	<div class="about-problem-info">
			        		<span class="about-problem-info-title">Сфера проблемы:</span>
			        		<span class="about-problem-info-text">текст</span>
			        	</div>
			        	<div class="about-problem-info">
			        		<span class="about-problem-info-title">Тип проблемы:</span>
			        		<span class="about-problem-info-text">текст</span>
			        	</div>
			        	<div class="about-problem-info">
			        		<span class="about-problem-info-title">О проблеме:</span>
			        		<span class="about-problem-info-text">текст</span>
			        	</div>
			        </div>
		        	<ProblemsCardSlider :slides="['', '']" />
	        	</div>
		        <div class="problems-card-tab solutions" v-show="editTabShown == 2">
		        	<a href="" class="tabs-navigation-button solutions-add" @click.prevent="showSolutionsModal = true">
                        <img src="/main-page/add-card.png">
                        <span>Предложить решение</span>
                    </a>
                    <div class="solutions-block">
                    	<div class="solutions-date">21.06.2020. 13:05</div>
                    	<div class="solutions-name">Карина Ковальчук</div>
                    	<div class="solutions-text">Текст</div>
		        		<ProblemsCardSlider :slides="['', '']" />
		        		<div class="solutions-modal-close solutions-block-close">
				            <img src="~/static/main-page/modal-close-gray.png">
				        </div>
		        		<div class="solutions-modal-close solutions-block-edit">
				            <img src="~/static/main-page/modal-edit.png">
				        </div>
		        	</div>
		        	<div class="solutions-modal" v-show="showSolutionsModal">
		        		<div class="solutions-modal-inner">
		        			<div class="solutions-modal-close" @click="showSolutionsModal = false">
					            <img src="~/static/main-page/modal-close.png">
					        </div>
		        			<div class="step5-resource-description solutions-description">
								<h3 class="step5-title">Предложить решение:</h3>
								<div class="step5-textarea">
									<textarea maxlength="1000" placeholder="текст"></textarea>
								</div>
							</div>
							<div class="step5-add-file solutions-add-file">
								<h3 class="step5-title">Вы можете прикрепить файлы:</h3>
								<div class="solutions-add-file-items">
									<div class="step5-add-file-item">
										<button>
											<img src="~/static/main-page/modal-close.png">
										</button>
									</div>
									<button class="step5-add-file-button">
										<img src="~/static/step5/add-file.svg">
									</button>
								</div>
							</div>
							<button class="step5-modal-button solutions-button" @click="showSolutionsModal = false"><span>Опубликовать</span></button>
		        		</div>
		        	</div>
	        	</div>
		    </div>
	    </div>
	    <div class="problems-card-minimize" v-show="showEdit" @click="showEdit = false">
	    	<img src="~/static/problems/minimize.png">
	    </div>
	</div>
</template>

<script>
import ProblemsCardSlider from '~/components/elements/ProblemsCardSlider';

export default {
	components: {
		ProblemsCardSlider
	},

	data() {
		return {
			showEdit: false,
			editTabShown: 1,
			showSolutionsModal: false
		}
	}
}
</script>
