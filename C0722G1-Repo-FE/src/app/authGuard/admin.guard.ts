import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from '../service/token.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private toast: ToastrService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenService.getToken()) {
      console.log('roles -->', this.tokenService.getRole());
      console.log('check ad -->', JSON.stringify(this.tokenService.getRole()) === JSON.stringify(['ADMIN']));
      if (JSON.stringify(this.tokenService.getRole()) === JSON.stringify(['ADMIN'])) {
        return true;
      } else {
        this.toast.warning('Bạn không đủ quyền', 'Thông báo');
        this.router.navigateByUrl('');
        return false;
      }
    } else {
      this.router.navigateByUrl('');
      return false;
    }

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(childRoute);
    return this.canActivate(childRoute, state);
  }
}
