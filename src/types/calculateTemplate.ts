export interface ICalculatedTemplateComparison {
  id: string;
  title: string;
  template_ids: Array<string>;
}

export interface ICalculatedTemplate {
  templates: Array<{
    hashed_id: string;
    id: string;
    is_tier?: boolean;
    is_1_1_tier?: boolean;
    is_2_1_tier?: boolean;
    is_3_1_tier?: boolean;
    is_4_1_tier?: boolean;
    is_5_1_tier?: boolean;
    is_6_1_tier?: boolean;
    is_6_5_tier?: boolean;
    echo_comparison: Array<string>;
  }>;
  comparisons: {
    [resonatorName: string]: Array<ICalculatedTemplateComparison>;
  };
}
