import { Member } from './../../_models/member';
import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private memberService: MembersService, private route: ActivatedRoute ) {

  }

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
  }

    getImages(): NgxGalleryImage[] {
        const imageUrl = [];
        for (const photo of this.member.photos){
          imageUrl.push({
            small: photo?.url,
            medium: photo?.url,
            big: photo?.url
          })
        }

        return imageUrl;
    }

    loadMember() {
      this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
        this.member = member
        this.galleryImages = this.getImages();
      });
    }
}
