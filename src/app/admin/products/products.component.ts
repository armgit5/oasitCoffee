import { Component, OnInit, ViewChild } from '@angular/core';

declare var $: any;

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['../admin.component.css',
                '../animate.min.css',
                '../demo.css',
                '../light-bootstrap-dashboard.css']
})
export class ProductsComponent implements OnInit {


  testData = [
  {
    text: "Categories",
    children: [{
      text: "Coffee",
      children: [
        "Hot",
        "Cold",
        "Shake"
      ]
    },
      "Foods",
      "Drinks",
      "Cakes"
    ],
    state: {
      selected: true
    }
  },
  {
    text: "Attributes",
    children: [
      {
        text: "SM",
        children: []
      },
      "MD",
      "LG"
    ],
    max_children: 1
  }];

  constructor() { }

  ngOnInit() {
    $('#tree').jstree({
      "core" : {
          "animation" : 0,
          "check_callback" : (operation, node, node_parent, node_position) => {

            console.log(operation, node, node_parent, node_position);
            if (operation == "create_node") {

            }

          },
          "themes" : { "stripes" : true },
          'data' : this.testData
      }
    }).on('loaded.jstree', () => {
      $('#tree').jstree('open_all');
    });
  }

  create() {
    let ref = $('#tree').jstree(true),
        sel = ref.get_selected();
    if (!sel.length) { return false; }
    console.log(sel);
    sel = sel[0];
    sel = ref.create_node(sel, {"type":"file"});
    if (sel) {
      ref.edit(sel, null, (info) => {
        console.log(info.text);
      });
    }
  };

  rename() {
    let ref = $('#tree').jstree(true),
    sel = ref.get_selected();
    if (!sel.length) { return false; }
    sel = sel[0];
    ref.edit(sel, null, (info) => {
      console.log(info.text);
    });
  }

  delete() {
    let ref = $('#tree').jstree(true),
        sel = ref.get_selected(true);
    if (!sel.length) { return false; }
    ref.delete_node(sel);
    console.log(sel[0].text);
  };


}
