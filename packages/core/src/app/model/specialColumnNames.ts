/**
 * Provide a list of aliases and attributes to apply to common columns
 */

export default {
  sys_id: {
    label: 'System Id',
    hint: 'Unique system identifier',
    visible: false
  },
  sys_auto_id: {
    label: 'System Auto Id',
    hint: 'Auto Generated system identifier',
    visible: false
  },
  sys_updated_at: {
    label: 'Updated At',
    hint:
      'The last time this record was updated either automatically or by a user'
  },
  sys_updated_by: {
    label: 'Updated By',
    hint: 'The last person or bot to update this record'
  },
  sys_created_at: {
    label: 'Created At',
    hint: 'The time that this record was originally created.'
  },
  sys_created_by: {
    label: 'Created By',
    hint: 'The user or bot that originally created this record.'
  }
}
