export type FeedbackProps = {
  id: number;
  url: string;
  domain: string;
  email: string;
  name?: string;
  message: string;
  screenshot?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DashboardPageProps = {
  domains: string[];
  feedbacks: Record<string, FeedbackProps[]>;
};

export type FilterProps = DashboardPageProps & {
  selected?: string | undefined;
  onSelected: (domain: string) => void;
};
