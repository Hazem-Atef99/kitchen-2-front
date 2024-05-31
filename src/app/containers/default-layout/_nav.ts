import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'الرائيسية',
    description: "",
    url: '/home',
    // iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'العملاء',
    description: "",

    url: '/clients',
    // iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'عروض الاسعار',
    description: "عرض السعر",
    url: '/quotations',
    // iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'العقد',
    description: "عقد",
    url: '/contract',
    // iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'طلبات الانتاج',
    description:"طلب انتاج " ,
    url: '/production-requests',
    // iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'المتابعات',
    description:"المتابعات" ,

    url: '/follows',
    // iconComponent: { name: 'cil-speedometer' },
  },
  // {
  //   name: 'الملاحظات',
  //   url: '/home',
  //   // iconComponent: { name: 'cil-speedometer' },
  // },

  {
    name: 'الصيانة',
    description:"الصيانه" ,
    url: '/home',
    // iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'التحليل',
    description: "التحليل",

    url: '/home',
    // iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'التوب',
    description: " التوب",

    url: '/top',
    // iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'التقارير',
    description: "التقارير",

    url: '/home',
    // iconComponent: { name: 'cil-speedometer' },
  },
  // {
  //   name: 'النواقص',
  //   url: '/home',
  //   // iconComponent: { name: 'cil-speedometer' },
  // },
  {
    name: 'محضر استقبال',

    description: "محضر الاستقبال",

    url: '/reception-report',
    // iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'سندات القبض',
    description: "سندات القبض",
    url: '/client-payment',
    // iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'توصيلات صحية',
    description:"التوصيلات الصحيه",

    url: '/sanitaryConnections',
    // iconComponent: { name: 'cil-speedometer' },
  },

];
