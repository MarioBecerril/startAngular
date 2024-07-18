import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string = '';

  totalRevenue: number = 9542.00;
  netProfit: number = 3526.56;
  netRevenue: number = 5324.85;
  salesBySource = [
    { source: 'Facebook Ads', category: 'Shoes', sales: 4562, revenue: 47526.00, growth: 50, icon: 'facebook' },
    { source: 'Twitter Ads', category: 'T-shirt', sales: 1652, revenue: 52785.00, growth: 45, icon: 'twitter' },
    { source: 'Linkedin Ads', category: 'Watch', sales: 5256, revenue: 52785.00, growth: -30, icon: 'linkedin' },
    { source: 'Youtube Ads', category: 'Chairs', sales: 6965, revenue: 86456.00, growth: 35, icon: 'youtube' },
    { source: 'Instagram Ads', category: 'Chairs', sales: 8532, revenue: 92452.00, growth: 25, icon: 'instagram' },
  ];
  orderStats = {
    completed: 56236,
    processing: 12596,
    canceled: 1568
  };
  productTracking = [
    { status: 'Delivered', description: 'Have 5 pending order.', date: 'Nov 02', time: '6 hour ago' },
    { status: 'Pick Up', description: 'New Order Received', date: 'Nov 03', time: '1 day ago' },
    { status: 'In Transit', description: 'Manager Posted', date: 'Nov 03', time: 'Yesterday' },
    { status: 'Pending', description: 'Have 1 pending order.', date: 'Nov 04', time: '2 hour ago' },
  ];
  bestSellingProducts = [
    { name: 'Stylish Cricket & Walking Light Weight Shoes', price: 140.00, originalPrice: 280.00, image: 'https://i.ebayimg.com/images/g/JKIAAOSwQXRjrsaM/s-l1200.jpg' },
    { name: 'Combo Pack of 2 Sports Shoes Running Shoes', price: 280.00, originalPrice: 320.00, image: 'https://come4buy.com/cdn/shop/products/sports-shoes-men-comtable-sneakers-230828002005.jpg' },
  ];

  greet() {
    alert('Hello, welcome to your dashboard');
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.username = this.userService.getUsername();
  }

}

