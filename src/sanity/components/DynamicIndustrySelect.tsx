import React, { useEffect, useState } from 'react'
import { StringInputProps, useClient, useFormValue, set } from 'sanity'
import { Select } from '@sanity/ui'

export function DynamicIndustrySelect(props: StringInputProps) {
  const client = useClient({ apiVersion: '2023-01-01' })
  const [industries, setIndustries] = useState<Array<{ title: string; value: string }>>([])
  const [loading, setLoading] = useState(false)

  // Get the transformation template reference from the document using useFormValue for better reactivity
  const transformationTemplate = useFormValue(['transformationTemplate']) as any
  const transformationTemplateRef = transformationTemplate?._ref

  useEffect(() => {
    console.log('Component re-rendered. Transformation template data:', transformationTemplate)
    console.log('Transformation template ref:', transformationTemplateRef)
    
    if (!transformationTemplateRef) {
      console.log('No transformation template ref found, clearing industries')
      setIndustries([])
      return
    }

    const fetchIndustries = async () => {
      setLoading(true)
      try {
        console.log('Fetching industries for transformation template:', transformationTemplateRef)
        
        // Fetch the transformation template and its linked leadership template
        const transformationTemplate = await client.fetch(
          `*[_type == "transformationTemplate" && _id == $transformationId][0] {
            _id,
            title,
            leadershipTemplate->{
              _id,
              title,
              industries
            }
          }`,
          { transformationId: transformationTemplateRef }
        )
        
        console.log('Transformation template data:', transformationTemplate)
        
        // Check if transformation template exists
        if (!transformationTemplate) {
          console.log('Transformation template not found')
          setIndustries([])
          return
        }
        
        // Check if leadership template is linked
        if (!transformationTemplate.leadershipTemplate) {
          console.log('No leadership template linked to transformation template')
          setIndustries([])
          return
        }
        
        // Extract industries from the leadership template
        const leadershipIndustries = transformationTemplate.leadershipTemplate.industries || []
        console.log('Leadership template industries:', leadershipIndustries)
        
        // Convert to options format
        const industryOptions = leadershipIndustries.map((industry: string) => ({
          title: industry,
          value: industry
        }))
        
        setIndustries(industryOptions)
      } catch (error) {
        console.error('Error fetching industries:', error)
        setIndustries([])
      } finally {
        setLoading(false)
      }
    }

      fetchIndustries()
    }, [transformationTemplateRef, client])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    props.onChange(set(value))
  }

  if (loading) {
    return (
      <div style={{ padding: '1rem', color: '#666' }}>
        Loading industries...
      </div>
    )
  }

    if (!transformationTemplateRef) {
      return (
        <div style={{ padding: '1rem', color: '#999' }}>
          Please select a Transformation Template first to see available industries.
        </div>
      )
    }

  if (industries.length === 0 && !loading) {
    return (
      <div style={{ padding: '1rem', color: '#999' }}>
        <div>No industries found. This could be because:</div>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
          <li>The selected Transformation Template doesn't have a linked Leadership Template</li>
          <li>The Leadership Template doesn't have any industries defined</li>
        </ul>
        <div style={{ marginTop: '0.5rem', fontSize: '12px' }}>
          <strong>Debug Info:</strong><br/>
          Transformation Template ID: {transformationTemplateRef || 'Not selected'}<br/>
          Check the browser console for more details.
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        Industry
      </label>
      <select
        value={props.value || ''}
        onChange={handleChange}
        style={{
          width: '100%',
          padding: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      >
        <option value="">Select an industry...</option>
        {industries.map((industry) => (
          <option key={industry.value} value={industry.value}>
            {industry.title}
          </option>
        ))}
      </select>
      <div style={{ marginTop: '0.5rem', fontSize: '12px', color: '#666' }}>
        Industries are loaded from the Leadership Template of the selected Brand Template.
      </div>
    </div>
  )
}
