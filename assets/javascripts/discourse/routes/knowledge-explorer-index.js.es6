import DiscourseRoute from "discourse/routes/discourse";
import I18n from "I18n";
import KnowledgeExplorer from "discourse/plugins/discourse-knowledge-explorer/discourse/models/knowledge-explorer";

export default DiscourseRoute.extend({
  queryParams: {
    ascending: { refreshModel: true },
    filterCategories: { refreshModel: true },
    filterTags: { refreshModel: true },
    filterSolved: { refreshModel: true },
    orderColumn: { refreshModel: true },
    selectedTopic: { refreshModel: true },
    searchTerm: {
      replace: true,
      refreshModel: true,
    },
  },
  model(params) {
    this.controllerFor("knowledgeExplorer.index").set("isLoading", true);
    return KnowledgeExplorer.list(params).then((result) => {
      this.controllerFor("knowledgeExplorer.index").set("isLoading", false);
      return result;
    });
  },

  titleToken() {
    const model = this.currentModel;
    const pageTitle = I18n.t("knowledge_explorer.title");
    if (model.topic.title && model.topic.category_id) {
      const categoryName = this.site.categories.findBy(
        "id",
        model.topic.category_id
      ).name;
      return `${model.topic.unicode_title} - ${categoryName} - ${pageTitle}`;
    } else {
      return pageTitle;
    }
  },

  setupController(controller, model) {
    controller.set("topic", model.topic);
    controller.set("model", model);
  },
});
