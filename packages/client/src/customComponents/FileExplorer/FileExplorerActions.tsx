export function FileExplorerActions(props) {
  return (
    <div className='file-explorer-action-toolbar'>
      <ul className='file-explorer-actions-list'>
        <li role='presentation' className='toolbar-action-item'>
          <a
            className='explorer-action-button toolbar-icon-new-file'
            role='button'
          />
        </li>
        <li role='presentation' className='toolbar-action-item'>
          <a
            className='explorer-action-button toolbar-icon-new-folder'
            role='button'
          />
        </li>
        <li role='presentation' className='toolbar-action-item'>
          <a
            className='explorer-action-button toolbar-icon-refresh'
            role='button'
          />
        </li>
      </ul>
    </div>
  )
}
