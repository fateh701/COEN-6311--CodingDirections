import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "../authentication/authentication.model";
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-accountmanagement',
  templateUrl: './accountmanagement.component.html',
  styleUrl: './accountmanagement.component.css'
})
export class AccountmanagementComponent {
  displayedColumns: string[] = ['id', 'username', 'email', 'user_type', 'actions'];
  users: User[] = [];
  agents: User[] = [];
  searchTerm: string =''; //for search functionality based on username
  agentSearchTerm: string =''; //for search functionality based on username
  constructor(private sharedService: SharedService) {
    this.sharedService.getUsersList().subscribe((data: any[]) => {
      this.users = data;
    });
    this.sharedService.getAgentsList().subscribe((data: any[]) => {
      this.agents = data;
    });
  }

  get filteredUsers() {
    if (this.searchTerm) {
      return this.users.filter(user => user.username.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else {
      return this.users;
    }
  }

  get filteredAgents() {
    if (this.agentSearchTerm) {
      return this.agents.filter(user => user.username.toLowerCase().includes(this.agentSearchTerm.toLowerCase()));
    } else {
      return this.agents;
    }
  }

  deleteUser(user: User): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.sharedService.deleteUser(user.id).subscribe(() => {
        this.users = this.users.filter(u => u.id !== user.id);
        console.log('User deleted successfully');
      }, error => {
        console.error('Error deleting user:', error);
      });
    }
  }

  deleteAgent(agent: User): void {
    if (confirm('Are you sure you want to delete this agent?')) {
      this.sharedService.deleteAgent(agent.id).subscribe(() => {
        this.agents = this.agents.filter(a => a.id !== agent.id);
        console.log('Agent deleted successfully');
      }, error => {
        console.error('Error deleting agent:', error);
      });
    }
  }

}
