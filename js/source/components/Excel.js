import React, { Component} from 'react';
import PropTypes from 'prop-types';

import { Table } from 'react-bootstrap';

import '../../../css/components/Excel.css';

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.initialData, 
      headers: props.headers,
      // sortby: null,
      // descending: false,
      edit: null, // [row index, cell index],
      // search: false,
      selectRow: null,
    };

    this._selectedKey = null;
    // this._preSearchData = null;
  }
    
  _fireOnDataChange(data) {
    this.props.onDataChange(data);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.initialData});
  }

  _clickHead(e) {

  }

    
  _showEditor(e) {
    if (this.props.edit === true) {
      let tempRow = parseInt(e.target.dataset.row, 10);
      if (tempRow === 1 && e.target.cellIndex > 0) {
        this.setState({edit: {
          row: tempRow,
          cell: e.target.cellIndex,
        }});
      }
    }
  }

  // If props wants to select row, the fireOndataChange will inform
  //  the selected row to parent
  _selectRow(e) {
    if (this.props.selectRow === true) {
      let data = this.state.data;
      let tempRow = parseInt(e.target.dataset.row, 10);
      // Set select mark - array cell position -> IMPORTANT
      for (let i = 0; i < data.length; i++)
        if (i === tempRow)
          data[i][4] = '✔'; // \u2714
        else
          data[i][4] = '';
      this.setState({
        data: data,
        selectRow: tempRow,
      });
      this._fireOnDataChange(tempRow);
    }
  }
    
  _save(e) {
    e.preventDefault();
    var input = e.target.firstChild;
    var data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this.setState({
      edit: null,
      data: data,
    });
    this._fireOnDataChange(data);
  }
    
  _OnBlurInput(e) {
    var input = e.target.value;
    var data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input;
    this.setState({
      edit: null,
      data: data,
    });
    this._fireOnDataChange(data);
  }

    
  // _toggleSearch() {
  //   if (this.state.search) {
  //     this.setState({
  //       data: this._preSearchData,
  //       search: false,
  //     });
  //     this._preSearchData = null;
  //   } else {
  //     this._preSearchData = this.state.data;
  //     this.setState({
  //       search: true,
  //     });
  //   }
  // }
    
  // _search(e) {
  //   var needle = e.target.value.toLowerCase();
  //   if (!needle) {
  //     this.setState({data: this._preSearchData});
  //     return;
  //   }
  //   var idx = e.target.dataset.idx;
  //   var searchdata = this._preSearchData.filter(function(row) {
  //     return row[idx].toString().toLowerCase().indexOf(needle) > -1;
  //   });
  //   this.setState({data: searchdata});
  // }
    
  _download(format, ev) {
    var contents = format === 'json'
      ? JSON.stringify(this.state.data)
      : this.state.data.reduce(function(result, row) {
        return result
                + row.reduce(function(rowresult, cell, idx) {
                  return rowresult 
                    + '"' 
                    + cell.replace(/"/g, '""')
                    + '"'
                    + (idx < row.length - 1 ? ',' : '');
                }, '')
                + '\n';
      }, '');
    var URL = window.URL || window.webkitURL;
    var blob = new Blob([contents], {type: 'text/' + format});
    ev.target.href = URL.createObjectURL(blob);
    ev.target.download = 'data.' + format;
  }
    
  render() {
    return (
      <div className="Excel">
        {/*this._renderToolbar()*/}
        {this._renderTable()}
      </div>
    );
  }
    
  // _renderToolbar() {
  //   return (
  //     <div className="toolbar">
  //       <button onClick={this._toggleSearch}>Search</button>
  //       <a onClick={this._download.bind(this, 'json')} 
  //         href="data.json">Export JSON</a>
  //       <a onClick={this._download.bind(this, 'csv')} 
  //         href="data.csv">Export CSV</a>
  //     </div>
  //   );
  // }
    
  // _renderSearch() {
  //   if (!this.state.search) {
  //     return null;
  //   }
  //   return (
  //     <tr onChange={this._search}>
  //       {this.state.headers.map(function(_ignore, idx) {
  //         return <td key={idx}><input type="text" data-idx={idx}/></td>;
  //       })}
  //     </tr>
  //   );
  // }
    
  _renderTable() {
    return (
      <Table bordered={true} condensed={true} hover={true} >
        <thead onClick={this._clickHead.bind(this)}>
          <tr>{
            this.state.headers.map(function(title, idx) {
              {/* if (this.state.sortby === idx) {
                title += this.state.descending ? ' \u2191' : ' \u2193';
              } */}
              return <th key={idx}>{title}</th>;
            }, this)
          }</tr>
        </thead>
        <tbody onClick={this._showEditor.bind(this)}>
          {/* {this._renderSearch()} */}
          {this.state.data.map(function(row, rowidx) {
            return (
              <tr key={rowidx} onClick={this._selectRow.bind(this)} >{
                row.map(function(cell, idx) {
                  var content = cell;
                  var edit = this.state.edit;
                  if (edit && edit.row === rowidx && edit.cell === idx) {
                    content = (
                      <form style={{width: 30}} onSubmit={this._save.bind(this)}>
                        <input type="text" size="1" defaultValue={cell} onBlur={this._OnBlurInput.bind(this)}/>
                      </form>
                    );
                  }
                  //if (this.state.selectRow == rowidx)
                  {/* return <td key={idx} data-row={rowidx} className={'line-strong'}>{content}</td>; */}
                  {/* else */}
                  return <td key={idx} data-row={rowidx}>{content}</td>;
                }, this)}
              </tr>
            );
          }, this)}
        </tbody>
      </Table>
    );
  }
}
      
Excel.propTypes = {
  headers: PropTypes.arrayOf(React.PropTypes.string),
  initialData: PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.string)),
  onDataChange: PropTypes.func,
  selectRow: PropTypes.bool,
  edit: PropTypes.bool,
};
  
export default Excel;
