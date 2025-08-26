import layout from "@/layouts/default.vue";
import Markdown from "@/components/Markdown.vue";

export const guide: any = {
  path: "/guide",
  component: layout,
  children: [
    {
      path: "statistics/development_materials/comparison",
      component: Markdown,
      meta: { path: "statistics/development_materials/comparison.md" },
    },
    {
      path: "statistics/development_materials/v1_1_solaris_5",
      component: Markdown,
      meta: { path: "statistics/development_materials/v1_1_solaris_5.md" },
    },
    {
      path: "statistics/development_materials/v1_1_solaris_6",
      component: Markdown,
      meta: { path: "statistics/development_materials/v1_1_solaris_6.md" },
    },
    {
      path: "statistics/development_materials/v1_1_solaris_7",
      component: Markdown,
      meta: { path: "statistics/development_materials/v1_1_solaris_7.md" },
    },
    {
      path: "statistics/development_materials/v1_2_solaris_7",
      component: Markdown,
      meta: { path: "statistics/development_materials/v1_2_solaris_7.md" },
    },
    {
      path: "statistics/development_materials/v1_3_solaris_8",
      component: Markdown,
      meta: { path: "statistics/development_materials/v1_3_solaris_8.md" },
    },
    {
      path: "statistics/development_materials/v1_4_solaris_8",
      component: Markdown,
      meta: { path: "statistics/development_materials/v1_4_solaris_8.md" },
    },
    {
      path: "simulated_echo",
      component: Markdown,
      meta: { path: "simulated_echo.md" },
    },
    {
      path: "",
      component: Markdown,
      meta: { path: "main.md" },
    },
  ],
};
