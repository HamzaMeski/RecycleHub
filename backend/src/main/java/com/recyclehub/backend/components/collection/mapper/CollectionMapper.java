package com.recyclehub.backend.components.collection.mapper;

import com.recyclehub.backend.components.collection.dto.CollectionRequestDTO;
import com.recyclehub.backend.components.collection.dto.WasteItemDTO;
import com.recyclehub.backend.entities.CollectionRequest;
import com.recyclehub.backend.entities.RequestPhoto;
import com.recyclehub.backend.entities.WasteItem;
import com.recyclehub.backend.enums.WasteType;
import org.mapstruct.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CollectionMapper {
    
    @Mapping(target = "id", source = "id")
    @Mapping(target = "wasteTypes", expression = "java(mapWasteTypesFromItems(request.getWasteItems()))")
    @Mapping(target = "photos", expression = "java(mapPhotosToUrls(request.getPhotos(), false))")
    @Mapping(target = "weightInGrams", expression = "java(convertKgToGrams(request.getEstimatedWeight()))")
    @Mapping(target = "collectionAddress", source = "street")
    @Mapping(target = "city", source = "city")
    @Mapping(target = "collectionDateTime", source = "desiredDateTime")
    @Mapping(target = "notes", source = "notes")
    @Mapping(target = "status", source = "status")
    @Mapping(target = "actualWeightInGrams", expression = "java(convertKgToGrams(request.getActualWeight()))")
    @Mapping(target = "collectionPhotos", expression = "java(mapPhotosToUrls(request.getPhotos(), true))")
    @Mapping(target = "createdAt", source = "createdAt")
    @Mapping(target = "updatedAt", source = "updatedAt")
    CollectionRequestDTO toDTO(CollectionRequest request);

    @Mapping(target = "requestId", source = "request.id")
    WasteItemDTO wasteItemToDTO(WasteItem wasteItem);

    @Mapping(target = "request", ignore = true)
    WasteItem dtoToWasteItem(WasteItemDTO dto);

    default Set<WasteType> mapWasteTypesFromItems(List<WasteItem> items) {
        if (items == null) return null;
        return items.stream()
                .map(WasteItem::getType)
                .collect(Collectors.toSet());
    }

    default List<String> mapPhotosToUrls(List<RequestPhoto> photos, boolean isCollector) {
        if (photos == null) return null;
        return photos.stream()
                .filter(photo -> isCollector == Boolean.TRUE.equals(photo.getIsCollectorPhoto()))
                .map(RequestPhoto::getPhotoUrl)
                .collect(Collectors.toList());
    }

    default Integer convertKgToGrams(Double weightInKg) {
        if (weightInKg == null) return null;
        return (int) (weightInKg * 1000);
    }

    @InheritInverseConfiguration
    @Mapping(target = "individual", ignore = true)
    @Mapping(target = "collector", ignore = true)
    @Mapping(target = "wasteItems", ignore = true)
    @Mapping(target = "photos", ignore = true)
    @Mapping(target = "estimatedWeight", expression = "java(convertGramsToKg(dto.getWeightInGrams()))")
    @Mapping(target = "actualWeight", expression = "java(convertGramsToKg(dto.getActualWeightInGrams()))")
    CollectionRequest toEntity(CollectionRequestDTO dto);

    default Double convertGramsToKg(Integer weightInGrams) {
        if (weightInGrams == null) return null;
        return weightInGrams / 1000.0;
    }
}
