export const languageConfigs = {
  javascript: {
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    icon: "fab fa-js-square",
    display: "JavaScript"
  },
  react: {
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    icon: "fab fa-react",
    display: "React"
  },
  python: {
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    icon: "fab fa-python",
    display: "Python"
  },
  css: {
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    icon: "fab fa-css3-alt",
    display: "CSS"
  },
  html: {
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    icon: "fab fa-html5",
    display: "HTML"
  },
  typescript: {
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    icon: "fab fa-js-square",
    display: "TypeScript"
  }
};

export function getLanguageConfig(language: string) {
  return languageConfigs[language as keyof typeof languageConfigs] || {
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    icon: "fas fa-code",
    display: language
  };
}

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    if (diffInHours < 1) {
      return "Just now";
    }
    return `${Math.floor(diffInHours)} hours ago`;
  } else if (diffInHours < 168) { // 7 days
    return `${Math.floor(diffInHours / 24)} days ago`;
  } else {
    return `${Math.floor(diffInHours / 168)} weeks ago`;
  }
}
