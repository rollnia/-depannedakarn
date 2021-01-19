import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'user-dashboard',
    loadChildren: () => import('./pages/user-dashboard/user-dashboard.module').then(m => m.UserDashboardPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'service-providor-dashboard',
    loadChildren: () => import('./pages/service-providor-dashboard/service-providor-dashboard.module').then(m => m.ServiceProvidorDashboardPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'searchprovider',
    loadChildren: () => import('./pages/searchprovider/searchprovider.module').then(m => m.SearchproviderPageModule)
  },
  {
    path: 'listing',
    loadChildren: () => import('./pages/listing/listing.module').then(m => m.ListingPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentPageModule)
  },
  {
    path: 'payment-success',
    loadChildren: () => import('./pages/payment-success/payment-success.module').then(m => m.PaymentSuccessPageModule)
  },
  {
    path: 'demand-in-progress',
    loadChildren: () => import('./pages/demand-in-progress/demand-in-progress.module').then(m => m.DemandInProgressPageModule)
  },
  {
    path: 'bookingdetail',
    loadChildren: () => import('./pages/bookingdetail/bookingdetail.module').then(m => m.BookingdetailPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then(m => m.HistoryPageModule)
  },
  {
    path: 'monpaiment',
    loadChildren: () => import('./pages/monpaiment/monpaiment.module').then(m => m.MonpaimentPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule)
  },
  {
    path: 'notification-detail',
    loadChildren: () => import('./pages/notification-detail/notification-detail.module').then(m => m.NotificationDetailPageModule)
  },
  {
    path: 'edit-service',
    loadChildren: () => import('./pages/edit-service/edit-service.module').then(m => m.EditServicePageModule)
  },  {
    path: 'bit-payment',
    loadChildren: () => import('./pages/bit-payment/bit-payment.module').then( m => m.BitPaymentPageModule)
  },
  {
    path: 'subscription',
    loadChildren: () => import('./pages/subscription/subscription.module').then( m => m.SubscriptionPageModule)
  },
  {
    path: 'subscription-listing',
    loadChildren: () => import('./pages/subscription-listing/subscription-listing.module').then( m => m.SubscriptionListingPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
